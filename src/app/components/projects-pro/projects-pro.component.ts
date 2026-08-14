import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { KeyProjectAchievement } from 'src/app/models/resume';
import { ResumeService } from 'src/app/services/resume.service';
import { DurationService } from 'src/app/services/duration.service';

@Component({
  selector: 'app-projects-pro',
  templateUrl: './projects-pro.component.html',
  styleUrls: ['./projects-pro.component.scss']
})
export class ProjectsProComponent implements OnInit, OnDestroy {
  projects: KeyProjectAchievement[];
  private destroy$ = new Subject<void>();

  constructor(private resumeService: ResumeService, public durationService: DurationService) { }

  ngOnInit() {
    this.getKeyProjectAchievements();
  }

  getKeyProjectAchievements(): void {
    this.resumeService.getProProjects().pipe(takeUntil(this.destroy$)).subscribe(
      (response: KeyProjectAchievement[]) => { this.projects = response },
      (error) => { console.error('Error happened', error) }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
