import { Component, OnInit } from '@angular/core';
import { KeyProjectAchievement } from 'src/app/models/resume';
import { ResumeService } from 'src/app/services/resume.service';
import { DurationService } from 'src/app/services/duration.service';

@Component({
  selector: 'app-projects-pro',
  templateUrl: './projects-pro.component.html',
  styleUrls: ['./projects-pro.component.scss']
})
export class ProjectsProComponent implements OnInit {
  projects: KeyProjectAchievement[];

  constructor(private resumeService: ResumeService, public durationService: DurationService) { }

  ngOnInit() {
    this.getKeyProjectAchievements();
  }

  getKeyProjectAchievements(): void {
    this.resumeService.getProProjects().subscribe(
      (response: KeyProjectAchievement[]) => { this.projects = response },
      (error) => { console.error('Error happened', error) }
    );
  }
}
