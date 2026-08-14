import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectsService } from 'src/app/services/projects.service';
import { SelectRepository } from 'src/app/models/github';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  repositories: SelectRepository[];
  private destroy$ = new Subject<void>();

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.getReposInformation();
  }

  getReposInformation(): void {
    this.projectsService.getSelectedRepositories().pipe(takeUntil(this.destroy$)).subscribe((res: SelectRepository[]) => {
      this.repositories = res;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
