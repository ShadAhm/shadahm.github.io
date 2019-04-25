import { Component, OnInit } from '@angular/core';
import { ResumeContent, TechnicalSkillCategory, EmploymentHistory } from 'src/app/models/resume';

import { ResumeService } from 'src/app/services/resume.service';
import * as moment from 'moment';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  contents: ResumeContent[];
  technicalSkillCategories: TechnicalSkillCategory[];
  employmentHistories: EmploymentHistory[];

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.getResumeContents();
    this.getTechnicalSkills();
    this.getEmploymentHistories();
  }

  scrollIntoView(elementId: string): void {
    document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' });
  }

  getResumeContents(): void {
    this.contents = [
      {
        displayText: 'Introduction',
        elementId: 'h2Introduction'
      },
      {
        displayText: 'Technical Skills',
        elementId: 'h2Skills'
      },
      {
        displayText: 'Employment History',
        elementId: 'h2Employment'
      },
      {
        displayText: 'Education and Certifications',
        elementId: 'h2Education'
      }];
  }

  getTechnicalSkills(): void {
    this.resumeService.getTechnicalSkills().subscribe(
      (response: TechnicalSkillCategory[]) => { this.technicalSkillCategories = response },
      (error) => { console.error("Error happened", error) }
    );;
  }

  getEmploymentHistories(): void {
    this.resumeService.getEmploymentHistories().subscribe(
      (response: EmploymentHistory[]) => { this.employmentHistories = response },
      (error) => { console.error("Error happened", error) }
    );;
  }

  calculateEmploymentDuration(fromDateStr: string, toDateStr: string): string {
    let fromDate = moment(fromDateStr);
    let toDate = moment((new Date()).toISOString());

    if (toDateStr != null && toDateStr != '') {
      toDate = moment(toDateStr);
    }

    var years = toDate.diff(fromDate, 'year');
    fromDate.add(years, 'years');

    var months = toDate.diff(fromDate, 'months');
    fromDate.add(months, 'months');

    return years + ' years ' + months + ' months';
  }

  calculateTotalYearsExp(): string {
    let fromDateStr = this.employmentHistories[0].fromDate;
    let toDateStr = (new Date()).toISOString();

    let fromDate = moment(fromDateStr);
    let toDate = moment(toDateStr);

    if (toDateStr != null && toDateStr != '') {
      toDate = moment(toDateStr);
    }

    var years = toDate.diff(fromDate, 'year');
    fromDate.add(years, 'years');

    var months = toDate.diff(fromDate, 'months');
    fromDate.add(months, 'months');

    return years + ' years ' + months + ' months';
  }
}
