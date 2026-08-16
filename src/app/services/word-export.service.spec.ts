import { TestBed } from '@angular/core/testing';

import { WordExportService } from './word-export.service';
import { PoResume } from '../models/resume';
import { PoEmploymentEntry } from '../components/resume-po/resume-po.component';

const sampleResume: PoResume = {
  name: 'Jane Doe',
  legalName: 'Jane Q Doe',
  title: 'Software Engineer',
  location: 'Stockholm, Sweden',
  summary: 'A summary.',
  employmentHighlights: [],
  selectedHighlights: ['Highlight one'],
  communicationHighlights: ['Communication highlight'],
  skillGroups: [{ category: 'Technical', items: ['TypeScript', 'Angular'] }],
  education: [{ institution: 'Some University', credential: 'BSc', fromYear: '2010', toYear: '2014' }],
  languages: [{ language: 'English', proficiency: 'Fluent' }],
  contact: {
    phone: '123',
    email: 'jane@example.com',
    linkedInUrl: 'https://linkedin.com/in/jane',
    gitHubUrl: 'https://github.com/jane',
    location: 'Stockholm, Sweden'
  }
};

const sampleEmploymentEntries: PoEmploymentEntry[] = [{
  companyName: 'Acme Corp',
  companyUrl: 'https://acme.example.com',
  companySubscripts: null,
  position: 'Engineer',
  fromDate: '2020-01-01T00:00:00.000Z',
  toDate: null,
  location: 'Stockholm, Sweden',
  htmlElementId: 'empAcme',
  subtitle: null,
  positionHistory: null,
  projectRoles: null,
  highlights: ['Did great things']
}];

describe('WordExportService', () => {
  let anchorClickSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    anchorClickSpy = vi.fn();
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName === 'a') {
        return { click: anchorClickSpy, href: '', download: '' } as unknown as HTMLAnchorElement;
      }
      return originalCreateElement(tagName);
    });
    URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    URL.revokeObjectURL = vi.fn();
  });

  it('should be created', () => {
    const service: WordExportService = TestBed.inject(WordExportService);
    expect(service).toBeTruthy();
  });

  it('builds and downloads a non-empty docx blob from resume data', async () => {
    const service: WordExportService = TestBed.inject(WordExportService);

    await service.downloadResume(sampleResume, sampleEmploymentEntries);

    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    const blob = (URL.createObjectURL as ReturnType<typeof vi.fn>).mock.calls[0][0] as Blob;
    expect(blob.size).toBeGreaterThan(0);
    expect(anchorClickSpy).toHaveBeenCalledTimes(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });
});
