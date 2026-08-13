import { Component, OnInit } from '@angular/core';
import { ResumeContent, EmploymentHistory, KeyProjectAchievement, TechnicalSkill } from 'src/app/models/resume';

import { ResumeService } from 'src/app/services/resume.service';
import { DurationService } from 'src/app/services/duration.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  contents: ResumeContent[];
  technicalSkills: TechnicalSkill[];
  employmentHistories: EmploymentHistory[];
  keyProjectAchievements: KeyProjectAchievement[];
  constructor(private resumeService: ResumeService, public durationService: DurationService) { }

  ngOnInit() {
    this.getResumeContents();
    this.getTechnicalSkills();
    this.getEmploymentHistories();
    this.getKeyProjectAchievements();
  }

  scrollIntoView(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' });
    }
  }

  getResumeContents(): void {
    this.contents = [
      {
        displayText: 'Introduction',
        elementId: 'h2Introduction',
        children: null
      },
      {
        displayText: 'Technical Skills',
        elementId: 'h2Skills',
        children: null
      },
      {
        displayText: 'Employment History',
        elementId: 'h2Employment',
        children: null
      },
      {
        displayText: 'Key Project Achievements',
        elementId: 'h2KeyProject',
        children: []
      },
      {
        displayText: 'Education and Certifications',
        elementId: 'h2Education',
        children: null
      },
      {
        displayText: 'Other Information',
        elementId: 'h2Other',
        children: null
      }];
  }

  getTechnicalSkills(): void {
    this.resumeService.getTechnicalSkills().subscribe(
      (response: TechnicalSkill[]) => { this.technicalSkills = response },
      (error) => { console.error('Error happened', error) }
    );
  }

  getEmploymentHistories(): void {
    this.resumeService.getEmploymentHistories().subscribe(
      (response: EmploymentHistory[]) => { 
        this.employmentHistories = response;
      },
      (error) => { console.error('Error happened', error) }
    );
  }

  getKeyProjectAchievements(): void {
    this.resumeService.getProProjects().subscribe(
      (response: KeyProjectAchievement[]) => { 
        this.keyProjectAchievements = response.filter(o => o.includeAsKeyAchievement);
        this.addProjectsToContentTable();
      },
      (error) => { console.error('Error happened', error) }
    );
  }

  private addProjectsToContentTable(): void {
    const contentTableProjects = this.contents.find(o => o.displayText == 'Key Project Achievements');

    contentTableProjects.children = this.keyProjectAchievements
      .map<ResumeContent>(o => ({
        displayText: o.title,
        elementId: o.htmlElementId,
        children: null
      }));
  }

  calculateTotalYearsExp(): string {
    if (this.employmentHistories) {
      const fromDateStr = this.employmentHistories[this.employmentHistories.length - 1].fromDate;
      const toDateStr = (new Date()).toISOString();

      return this.durationService.calculateTimeDuration(fromDateStr, toDateStr);
    }
  }

  print(): void {
    window.print();
  }
}
