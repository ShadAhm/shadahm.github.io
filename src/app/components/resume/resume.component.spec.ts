import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResumeComponent } from './resume.component';
import { IconComponent } from '../icon/icon.component';
import { EmploymentHistory } from 'src/app/models/resume';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ResumeComponent, IconComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should interpolate {totalYears} token in summary from employment histories', () => {
    const dummyEmployment: EmploymentHistory[] = [
      {
        companyName: 'Company B',
        companyUrl: '',
        companySubscripts: null,
        position: 'Senior Engineer',
        fromDate: '2020-01-01T00:00:00.000Z',
        toDate: null,
        location: '',
        htmlElementId: 'b',
        subtitle: null,
        positionHistory: null,
        projectRoles: null
      },
      {
        companyName: 'Company A',
        companyUrl: '',
        companySubscripts: null,
        position: 'Junior Developer',
        fromDate: '2015-01-01T00:00:00.000Z',
        toDate: '2019-12-31T00:00:00.000Z',
        location: '',
        htmlElementId: 'a',
        subtitle: null,
        positionHistory: null,
        projectRoles: null
      }
    ];

    const summaryTemplate = 'Engineer with over {totalYears} years of experience across software engineering.';
    const result = component.interpolateSummary(summaryTemplate, dummyEmployment);

    const earliestDate = new Date('2015-01-01T00:00:00.000Z');
    const expectedYears = component.durationService.calculateWholeYears(earliestDate.toISOString(), null);

    expect(result).toBe(`Engineer with over ${expectedYears} years of experience across software engineering.`);
  });

  it('should return original summary if summary is empty or no employment histories exist', () => {
    expect(component.interpolateSummary('', [])).toBe('');
    expect(component.interpolateSummary('Summary without token', [])).toBe('Summary without token');
  });
});
