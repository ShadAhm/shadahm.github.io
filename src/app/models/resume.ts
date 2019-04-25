export class ResumeContent {
    public displayText: string;
    public elementId: string;
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
    public position: string;
    public fromDate: Date;
    public toDate: Date;
}