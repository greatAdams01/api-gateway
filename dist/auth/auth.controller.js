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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const user_dto_1 = require("../user/dto/user.dto");
const auth_service_1 = require("./auth.service");
const jwt_guard_1 = require("./guards/jwt.guard");
const local_guard_1 = require("./guards/local.guard");
let AuthController = class AuthController {
    constructor(client, authService) {
        this.client = client;
        this.authService = authService;
    }
    home() {
        return 'Welcome to auth';
    }
    async me(req) {
        return req.user;
    }
    accumulate() {
        const pattern = { cmd: 'sum' };
        const payload = [1, 2, 3];
        return this.client.send(pattern, payload);
    }
    async login(data) {
        const result = await this.authService.loginWithEmail(data.email, data.phone, data.password);
        return {
            id: result.user.id,
            token: result.token,
            isActive: result.user.isActive,
        };
    }
    async register(data, session) {
        const location = session.location;
        const result = await this.authService.registerWithEmail(Object.assign(Object.assign({}, data), { location }));
        return {
            id: result.user.id,
            token: result.token,
            isActive: result.user.isActive,
        };
    }
    async registerWithGoogleAndFacebook(data) {
        const result = await this.authService.registerWithGoogleAndFacebook(data);
        return { id: result.user.id, token: result.token };
    }
    async googleAndFacebook(req, data) {
        const result = await this.authService.registerWithGoogleAndFacebook(data);
        return { id: result.user.id, token: result.token };
    }
    async forgotPassword(data) {
        const user = await this.authService.forgotPassword(data.email);
        return user === null || user === void 0 ? void 0 : user.id;
    }
    async verifyToken(data) {
        const user = await this.authService.verifyToken(data.token);
        return user === null || user === void 0 ? void 0 : user.id;
    }
    async resendToken(data) {
        const user = await this.authService.resendVerificationToken(data.email);
        return user.id;
    }
    async changePassword(data) {
        const user = await this.authService.changePassword(data);
        return { id: user.id, email: user.email };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "home", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Get)('sum'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "accumulate", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiParam)({
        type: user_dto_1.LoginWithEmailDTO,
        name: 'login',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RegisterWithEmailDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('register-google'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerWithGoogleAndFacebook", null);
__decorate([
    (0, common_1.Post)('google-facebook'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAndFacebook", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('verify-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.Post)('resend-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendToken", null);
__decorate([
    (0, common_1.UseGuards)(local_guard_1.RestAuthGuard),
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ChangePasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)('MAIL_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map