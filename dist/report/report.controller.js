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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const report_dto_1 = require("./report.dto");
let ReportController = class ReportController {
    constructor(client) {
        this.client = client;
    }
    report(data) {
        this.client.emit('report-camp', data);
        return 'Sucess';
    }
    resolvedReport(param) {
        const slug = param.reportId;
        this.client.emit('resove-camp-report', slug);
        return 'Sucess';
    }
    getCampainReports(param) {
        const slug = param.campaignSlug;
        const pattern = { cmd: 'camp-reports' };
        const payload = slug;
        return this.client.send(pattern, payload);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.reportDTO]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "report", null);
__decorate([
    (0, common_1.Put)('/:reportId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "resolvedReport", null);
__decorate([
    (0, common_1.Get)('/:campaignSlug'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ReportController.prototype, "getCampainReports", null);
ReportController = __decorate([
    (0, common_1.Controller)('api/report'),
    __param(0, (0, common_1.Inject)('REPORT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map