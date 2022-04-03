import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsProComponent } from './projects-pro.component';

describe('ProjectsProComponent', () => {
  let component: ProjectsProComponent;
  let fixture: ComponentFixture<ProjectsProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
