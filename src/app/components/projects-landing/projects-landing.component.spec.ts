import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsLandingComponent } from './projects-landing.component';
import { IconComponent } from '../icon/icon.component';
describe('ProjectsLandingComponent', () => {
  let component: ProjectsLandingComponent;
  let fixture: ComponentFixture<ProjectsLandingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsLandingComponent, IconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
