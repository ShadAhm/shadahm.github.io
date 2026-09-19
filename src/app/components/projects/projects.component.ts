import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectsService } from 'src/app/services/projects.service';
import { RepositoryGroupView } from 'src/app/models/github';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  groups: RepositoryGroupView[];
  private destroy$ = new Subject<void>();

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.getReposInformation();
  }

  getReposInformation(): void {
    this.projectsService.getSelectedRepositories().pipe(takeUntil(this.destroy$)).subscribe((res: RepositoryGroupView[]) => {
      this.groups = res;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
