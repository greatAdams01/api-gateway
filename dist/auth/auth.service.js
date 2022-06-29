"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_2 = require("mongoose");
const user_dto_1 = require("../user/dto/user.dto");
const user_schema_1 = require("../user/entity/user.schema");
const config_1 = require("../utils/config");
let AuthService = class AuthService {
    constructor(userModel, req, client, jwtService) {
        this.userModel = userModel;
        this.req = req;
        this.client = client;
        this.jwtService = jwtService;
    }
    async registerWithEmail(data) {
        var _a, _b, _c, _d;
        const { password, email } = data;
        let user = await this.userModel.findOne({ email });
        const session = this.req.session;
        if (user)
            throw new common_1.BadRequestException('Email already exist, signin instead');
        const payload = Object.assign(Object.assign({}, data), { password: bcrypt.hashSync(password, 10), emailToken: (Math.floor(Math.random() * 90000) + 10000).toString(), firstName: (_b = (_a = data === null || data === void 0 ? void 0 : data.name) === null || _a === void 0 ? void 0 : _a.split(' ')) === null || _b === void 0 ? void 0 : _b[0], lastName: (_d = (_c = data === null || data === void 0 ? void 0 : data.name) === null || _c === void 0 ? void 0 : _c.split(' ')) === null || _d === void 0 ? void 0 : _d[1], country: session.location.country_name, city: session.location.city });
        try {
            user = await this.userModel.create(payload);
            const payloadJWT = {
                email: user.email,
                sub: user._id
            };
            const token = this.jwtService.sign(payloadJWT);
            return {
                user,
                token,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async registerWithGoogleAndFacebook(data) {
        const session = this.req.session;
        let user = await this.userModel
            .findOne({ email: data.email })
            .select('-password');
        if (user) {
            try {
                await this.userModel.findByIdAndUpdate(user.id, Object.assign(Object.assign({}, data), { image: user.image ? user.image : data.image }), { new: true });
                const payloadJWT = {
                    email: user.email,
                    sub: user._id
                };
                const token = this.jwtService.sign(payloadJWT);
                return { user, token };
            }
            catch (error) {
                throw error;
            }
        }
        try {
            user = await this.userModel.create(Object.assign(Object.assign({}, data), { country: session.location.country_name, city: session.location.city, isActive: true }));
            const payloadJWT = {
                email: user.email,
                sub: user._id
            };
            const token = this.jwtService.sign(payloadJWT);
            return { user, token };
        }
        catch (error) {
            throw error;
        }
    }
    async loginWithEmail(email, phone, password) {
        try {
            let user;
            if (!email) {
                user = await this.userModel.findOne({ phone });
            }
            if (!phone) {
                user = await this.userModel.findOne({ email });
            }
            if (!user)
                throw new common_1.NotFoundException('You are not registered here');
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch)
                throw new common_1.UnauthorizedException('Email or password not correct');
            if (user.accountType === user_dto_1.AccountTypeEnum.Staff) {
                if (!(user === null || user === void 0 ? void 0 : user.isActive))
                    throw new common_1.BadRequestException('Please contact support@edfhr.org to activate your account');
            }
            const { firstName, lastName, image, id, role, accountType, reps, isActive, } = user;
            const payloadJWT = {
                email: user.email,
                sub: user._id
            };
            const session = this.req.session;
            console.log(session.location);
            const token = this.jwtService.sign(payloadJWT);
            this.client.emit('test_log', 'Test');
            return {
                user: {
                    firstName,
                    lastName,
                    image,
                    role,
                    email,
                    id,
                    accountType,
                    reps,
                    isActive,
                },
                token,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getMe(data) {
        try {
            await this.userModel.updateOne({ _id: data === null || data === void 0 ? void 0 : data.id }, {
                $set: { lastSeen: new Date() },
            });
            const user = await this.userModel.findById(data === null || data === void 0 ? void 0 : data.id).select('-password');
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async forgotPassword(email) {
        const user = await this.userModel.findOne({ email }).select('-password');
        if (!user)
            throw new common_1.NotFoundException('No record found');
        const token = Math.floor(Math.random() * 90000) + 10000;
        try {
            await this.userModel.findByIdAndUpdate(user.id, {
                $set: { emailToken: token === null || token === void 0 ? void 0 : token.toString() },
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyToken(token) {
        if (!token)
            throw new common_1.NotFoundException('No verification code');
        const user = await this.userModel
            .findOne({ emailToken: token })
            .select('-password');
        if (!user)
            throw new common_1.NotFoundException('Invalid token');
        try {
            await this.userModel.findByIdAndUpdate(user.id, { $set: { isActive: true, emailToken: '' } }, { multi: true, new: true });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async resendVerificationToken(email) {
        try {
            let user = await this.userModel.findOne({ email });
            if (!user)
                throw new common_1.NotFoundException('Please enter your registered email address');
            const emailToken = (Math.floor(Math.random() * 90000) + 10000).toString();
            user = await this.userModel.findByIdAndUpdate(user.id, {
                $set: {
                    emailToken,
                },
            }, { new: true });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword(data) {
        const reqUser = this.req.user;
        let user = await this.userModel.findById(reqUser.id);
        if (!user)
            throw new common_1.NotFoundException('No record found');
        const isMatch = bcrypt.compareSync(data.oldPassword, user.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException('invalid password');
        try {
            user = await this.userModel.findByIdAndUpdate(data.id, {
                $set: { password: bcrypt.hashSync(data.newPassword, 10) },
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyUser(token) {
        const validToken = (0, jsonwebtoken_1.verify)(token, config_1.default.SECRET, (err) => {
            if (err)
                throw new common_1.BadRequestException(err);
        });
        try {
            const user = await this.userModel
                .findById(validToken)
                .select('-password');
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyJWT(token) {
        const decoded = this.jwtService.verify(token, {
            secret: config_1.default.SECRET
        });
        const user = await this.userModel.findOne({ email: decoded.email });
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __param(2, (0, common_1.Inject)('MAIL_SERVICE')),
    __metadata("design:paramtypes", [mongoose_2.Model, Object, microservices_1.ClientProxy,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map