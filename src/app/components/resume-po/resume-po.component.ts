import { Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmploymentHistory, PoResume, ResumeContent } from 'src/app/models/resume';

import { ResumeService } from 'src/app/services/resume.service';
import { DurationService } from 'src/app/services/duration.service';
import { WordExportService } from 'src/app/services/word-export.service';

export interface PoEmploymentEntry extends EmploymentHistory {
  highlights: string[];
}

@Component({
  selector: 'app-resume-po',
  templateUrl: './resume-po.component.html',
  styleUrls: ['./resume-po.component.scss']
})
export class ResumePoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  contents: ResumeContent[];
  resume: PoResume;
  employmentEntries: PoEmploymentEntry[];

  constructor(
    private resumeService: ResumeService,
    public durationService: DurationService,
    private wordExportService: WordExportService
  ) { }

  ngOnInit() {
    this.getResumeContents();
    this.loadResumeData();
  }

  scrollIntoView(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  loadResumeData(): void {
    forkJoin({
      employmentHistories: this.resumeService.getEmploymentHistories(),
      resume: this.resumeService.getPoResume()
    }).pipe(takeUntil(this.destroy$)).subscribe(
      ({ employmentHistories, resume }) => {
        this.resume = resume;
        this.employmentEntries = employmentHistories.map(emp => ({
          ...emp,
          highlights: resume.employmentHighlights.find(h => h.companyName === emp.companyName)?.highlights ?? []
        }));
        if (this.resume.summary) {
          this.resume.summary = this.resume.summary.replace('{{yearsOfExperience}}', this.calculateTotalYearsExpWhole());
        }
        this.addEmploymentToContentTable();
      },
      (error) => { console.error('Error happened', error) }
    );
  }

  getResumeContents(): void {
    this.contents = [
      { displayText: 'Introduction', elementId: 'h2Introduction', children: null },
      { displayText: 'Career Highlights', elementId: 'h2Highlights', children: null },
      { displayText: 'Employment History', elementId: 'h2EmploymentHistory', children: null },
      { displayText: 'Professional Experience', elementId: 'h2Employment', children: [] },
      { displayText: 'Communication & Mentorship', elementId: 'h2Communication', children: null },
      { displayText: 'Technical & Product Skills', elementId: 'h2Skills', children: null },
      { displayText: 'Education', elementId: 'h2Education', children: null },
      { displayText: 'Languages', elementId: 'h2Languages', children: null },
      { displayText: 'Contact', elementId: 'h2Contact', children: null }
    ];
  }

  private addEmploymentToContentTable(): void {
    const contentTableEmployment = this.contents.find(o => o.displayText === 'Professional Experience');
    contentTableEmployment.children = this.employmentEntries.map<ResumeContent>(o => ({
      displayText: o.companyName,
      elementId: o.htmlElementId,
      children: null
    }));
  }

  calculateTotalYearsExp(): string {
    if (this.employmentEntries && this.employmentEntries.length) {
      const fromDateStr = this.employmentEntries[this.employmentEntries.length - 1].fromDate;
      return this.durationService.calculateTimeDuration(fromDateStr, (new Date()).toISOString());
    }
  }

  calculateTotalYearsExpWhole(): string {
    if (this.employmentEntries && this.employmentEntries.length) {
      const fromDateStr = this.employmentEntries[this.employmentEntries.length - 1].fromDate;
      const years = this.durationService.calculateWholeYears(fromDateStr, (new Date()).toISOString());
      return `over ${years} years`;
    }
  }

  print(): void {
    window.print();
  }

  exportWord(): void {
    this.wordExportService.downloadResume(this.resume, this.employmentEntries);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
