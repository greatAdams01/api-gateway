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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportSchemaRMQ = exports.ReportRMQ = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const report_dto_1 = require("./report.dto");
let ReportRMQ = class ReportRMQ extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ReportRMQ.prototype, "campaignSlug", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
        enum: report_dto_1.ReportEnum,
    }),
    __metadata("design:type", String)
], ReportRMQ.prototype, "reportType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ReportRMQ.prototype, "reportMessage", void 0);
ReportRMQ = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], ReportRMQ);
exports.ReportRMQ = ReportRMQ;
exports.ReportSchemaRMQ = mongoose_1.SchemaFactory.createForClass(ReportRMQ);
//# sourceMappingURL=reportRMQ.schema.js.map