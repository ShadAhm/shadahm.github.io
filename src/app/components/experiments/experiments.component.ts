import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectsService } from 'src/app/services/projects.service';
import { SelectRepository } from 'src/app/models/github';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss']
})
export class ExperimentsComponent implements OnInit, OnDestroy {
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
