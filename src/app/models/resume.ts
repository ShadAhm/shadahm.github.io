export class ResumeContent {
    public displayText: string;
    public elementId: string;
    public children: ResumeContent[];
}

export class TechnicalSkillCategory {
    public name: string; 
    public skills: TechnicalSkill[];
}

export class TechnicalSkill {
    public name: string; 
    public starred: boolean; 
}

export class EmploymentHistory {
    public companyName: string;
    public companyUrl: string;
    public companySubscripts: string[]; 
    public position: string;
    public fromDate: string;
    public toDate: string;
}

export class KeyProjectAchievement {
    public title: string;
    public fromDate: string;
    public toDate: string;
    public companyName: string;
    public clientName: string;
    public projectRole: string;
    public technologiesUsed: string;
    public description: string;
    public jobResponsibilities: string[];
    public htmlElementId: string;
}