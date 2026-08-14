import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GithubRepository, SelectRepository } from 'src/app/models/github';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./../projects.component.scss']
})
export class ProjectCardComponent implements OnInit, OnDestroy {
  @Input() data: SelectRepository;
  repo: GithubRepository;
  private destroy$ = new Subject<void>();

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getGitHubRepoInfo(this.data.name).pipe(takeUntil(this.destroy$)).subscribe((res: GithubRepository) => {
      this.repo = res;

      if (this.data.descriptionOverride != null && this.data.descriptionOverride.trim() != '')
        this.repo.description = this.data.descriptionOverride;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
