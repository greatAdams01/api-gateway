export declare enum ReportEnum {
    Deceptive = "Deceptive and fraudulent",
    Breaches = "Breaches human rights",
    Guilty = "Guilty of hate speech",
    Obscene = "Obscene image",
    Harmful = "Harmful to children",
    Incites = "Incites violence, sucide or harm",
    Encourages = "Encourages racism",
    Impersonation = "Impersonation"
}
export declare class reportDTO {
    campaignSlug: string;
    reportType: ReportEnum;
    reportMessage: string;
}
