import { Injectable } from '@angular/core';
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType
} from 'docx';
import { PoResume } from '../models/resume';
import { PoEmploymentEntry } from '../components/resume-po/resume-po.component';
import { DurationService } from './duration.service';

@Injectable({
  providedIn: 'root'
})
export class WordExportService {
  constructor(private durationService: DurationService) { }

  async downloadResume(resume: PoResume, employmentEntries: PoEmploymentEntry[]): Promise<void> {
    const doc = this.buildDocument(resume, employmentEntries);
    const blob = await Packer.toBlob(doc);
    this.triggerDownload(blob, this.buildFileName(resume));
  }

  private buildFileName(resume: PoResume): string {
    const slug = (resume.name || 'resume').trim().toLowerCase().replace(/\s+/g, '-');
    return `${slug}-resume.docx`;
  }

  private triggerDownload(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  private buildDocument(resume: PoResume, employmentEntries: PoEmploymentEntry[]): Document {
    return new Document({
      sections: [{
        children: [
          ...this.buildHeader(resume),
          ...this.buildBulletSection('Career Highlights', resume.selectedHighlights),
          ...this.buildEmploymentHistoryTable(employmentEntries),
          ...this.buildProfessionalExperience(employmentEntries),
          ...this.buildBulletSection('Technical Communication & Mentorship', resume.communicationHighlights),
          ...this.buildSkillGroups(resume),
          ...this.buildEducation(resume),
          ...this.buildLanguages(resume),
          ...this.buildContact(resume)
        ]
      }]
    });
  }

  private buildHeader(resume: PoResume): Paragraph[] {
    return [
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [
          new TextRun({ text: resume.name, bold: true }),
          new TextRun({ text: ` (${resume.legalName})` })
        ]
      }),
      new Paragraph({ children: [new TextRun({ text: resume.title, bold: true })] }),
      new Paragraph({ text: resume.location }),
      new Paragraph({ text: resume.summary, spacing: { after: 200 } })
    ];
  }

  private buildBulletSection(title: string, items: string[]): Paragraph[] {
    if (!items || !items.length) {
      return [];
    }
    return [
      new Paragraph({ text: title, heading: HeadingLevel.HEADING_1 }),
      ...items.map(item => new Paragraph({ text: item, bullet: { level: 0 } }))
    ];
  }

  private describeRoles(entry: PoEmploymentEntry): string {
    if (entry.positionHistory && entry.positionHistory.length > 1) {
      return 'Previous positions held: ' + entry.positionHistory
        .slice(0, -1)
        .map(role => `${role.title} (${this.formatDate(role.fromDate)} – ${role.toDate ? this.formatDate(role.toDate) : 'Present'})`)
        .join('; ');
    }
    if (!entry.positionHistory && entry.projectRoles) {
      return 'Project roles: ' + entry.projectRoles
        .map(role => `${role.title} (${this.formatDate(role.fromDate)} – ${role.toDate ? this.formatDate(role.toDate) : 'Present'})`)
        .join('; ');
    }
    return entry.subtitle ?? '';
  }

  private formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  private buildEmploymentHistoryTable(employmentEntries: PoEmploymentEntry[]): (Paragraph | Table)[] {
    if (!employmentEntries || !employmentEntries.length) {
      return [];
    }

    const headerRow = new TableRow({
      children: ['Company Name', 'Position Held', 'From', 'To', 'Year(s) in Company'].map(text =>
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text, bold: true })] })] })
      )
    });

    const rows = employmentEntries.map(entry => new TableRow({
      children: [
        entry.companyName,
        entry.position,
        this.formatDate(entry.fromDate),
        entry.toDate ? this.formatDate(entry.toDate) : 'Present',
        this.durationService.calculateTimeDuration(entry.fromDate, entry.toDate)
      ].map(text => new TableCell({ children: [new Paragraph({ text })] }))
    }));

    return [
      new Paragraph({ text: 'Employment History', heading: HeadingLevel.HEADING_1 }),
      new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [headerRow, ...rows] }),
      new Paragraph({ text: '', spacing: { after: 200 } })
    ];
  }

  private buildProfessionalExperience(employmentEntries: PoEmploymentEntry[]): Paragraph[] {
    if (!employmentEntries || !employmentEntries.length) {
      return [];
    }

    const paragraphs: Paragraph[] = [new Paragraph({ text: 'Professional Experience', heading: HeadingLevel.HEADING_1 })];

    for (const entry of employmentEntries) {
      paragraphs.push(new Paragraph({ text: entry.companyName, heading: HeadingLevel.HEADING_2 }));
      paragraphs.push(new Paragraph({ children: [new TextRun({ text: entry.position, bold: true })] }));

      const roleDescription = this.describeRoles(entry);
      if (roleDescription) {
        paragraphs.push(new Paragraph({ children: [new TextRun({ text: roleDescription, italics: true })] }));
      }

      const toDate = entry.toDate ? this.formatDate(entry.toDate) : 'present';
      const duration = this.durationService.calculateTimeDuration(entry.fromDate, entry.toDate);
      paragraphs.push(new Paragraph({ text: `${this.formatDate(entry.fromDate)} – ${toDate} (${duration})` }));
      paragraphs.push(new Paragraph({ text: entry.location, spacing: { after: 100 } }));

      for (const highlight of entry.highlights) {
        paragraphs.push(new Paragraph({ text: highlight, bullet: { level: 0 } }));
      }
    }

    return paragraphs;
  }

  private buildSkillGroups(resume: PoResume): Paragraph[] {
    if (!resume.skillGroups || !resume.skillGroups.length) {
      return [];
    }
    const paragraphs: Paragraph[] = [new Paragraph({ text: 'Technical & Product Skills', heading: HeadingLevel.HEADING_1 })];
    for (const group of resume.skillGroups) {
      paragraphs.push(new Paragraph({ children: [new TextRun({ text: group.category, bold: true })] }));
      paragraphs.push(new Paragraph({ text: group.items.join(', '), spacing: { after: 100 } }));
    }
    return paragraphs;
  }

  private buildEducation(resume: PoResume): Paragraph[] {
    if (!resume.education || !resume.education.length) {
      return [];
    }
    const paragraphs: Paragraph[] = [new Paragraph({ text: 'Education', heading: HeadingLevel.HEADING_1 })];
    for (const edu of resume.education) {
      paragraphs.push(new Paragraph({ children: [new TextRun({ text: edu.credential, bold: true })] }));
      paragraphs.push(new Paragraph({ text: edu.institution }));
      paragraphs.push(new Paragraph({ text: `${edu.fromYear} – ${edu.toYear}`, spacing: { after: 100 } }));
    }
    return paragraphs;
  }

  private buildLanguages(resume: PoResume): Paragraph[] {
    if (!resume.languages || !resume.languages.length) {
      return [];
    }
    const paragraphs: Paragraph[] = [new Paragraph({ text: 'Languages', heading: HeadingLevel.HEADING_1 })];
    for (const lang of resume.languages) {
      paragraphs.push(new Paragraph({ text: `${lang.language} — ${lang.proficiency}` }));
    }
    return paragraphs;
  }

  private buildContact(resume: PoResume): Paragraph[] {
    if (!resume.contact) {
      return [];
    }
    const contact = resume.contact;
    return [
      new Paragraph({ text: 'Contact', heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: `Phone: ${contact.phone}` }),
      new Paragraph({ text: `Email: ${contact.email}` }),
      new Paragraph({ text: `LinkedIn: ${contact.linkedInUrl}` }),
      new Paragraph({ text: `GitHub: ${contact.gitHubUrl}` }),
      new Paragraph({ text: `Location: ${contact.location}` })
    ];
  }
}
