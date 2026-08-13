export class ResumeContent {
    public displayText: string;
    public elementId: string;
    public children: ResumeContent[];
}

export class TechnicalSkill {
    public category: string;
    public name: string; 
    public starred: boolean; 
    public useHistory: TechnicalSkillGant[];
    public workSamples: WorkSample[]; 
}

export class TechnicalSkillGant implements IHasDuration {
    public fromDate: string;
    public toDate: string;
}

export class TechnicalSkillsGridDto {
    constructor(category: string) { this.category = category; this.skills = [] }
    public category: string;
    public skills: TechnicalSkillGridDto[];
}

export class TechnicalSkillGridDto extends TechnicalSkill {
    public totalYearsExp: number;
}

export class WorkSample {
    public label: string;
    public url:string; 
}

export class EmploymentHistory {
    public companyName: string;
    public companyUrl: string;
    public companySubscripts: string[];
    public position: string;
    public fromDate: string;
    public toDate: string;
    public location: string;
    public htmlElementId: string;
    public subtitle: string;
    public positionHistory: EmploymentHistoryRole[];
    public projectRoles: EmploymentHistoryRole[];
}

export class EmploymentHistoryRole implements IHasDuration {
    public title: string;
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
    public technologiesUsed: string[];
    public description: string;
    public jobResponsibilities: string[];
    public htmlElementId: string;
    public includeAsKeyAchievement: boolean;
}

export interface IHasDuration {
    fromDate: string;
    toDate: string;
}

export class PoEmploymentHighlight {
    public companyName: string;
    public highlights: string[];
}

export class PoSkillGroup {
    public category: string;
    public items: string[];
}

export class PoEducation {
    public institution: string;
    public credential: string;
    public fromYear: string;
    public toYear: string;
}

export class PoContact {
    public phone: string;
    public email: string;
    public linkedInUrl: string;
    public gitHubUrl: string;
    public location: string;
}

export class PoResume {
    public name: string;
    public fullName: string;
    public title: string;
    public location: string;
    public summary: string;
    public employmentHighlights: PoEmploymentHighlight[];
    public selectedHighlights: string[];
    public skillGroups: PoSkillGroup[];
    public education: PoEducation[];
    public contact: PoContact;
}