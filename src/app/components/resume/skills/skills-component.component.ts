import { Component, Input, OnInit } from '@angular/core';
import { TechnicalSkill, TechnicalSkillGridDto, TechnicalSkillsGridDto } from 'src/app/models/resume';
import { DurationService } from 'src/app/services/duration.service';

@Component({
  selector: 'app-skills-component',
  templateUrl: './skills-component.component.html',
  styleUrls: ['./skills-component.component.scss']
})
export class SkillsComponentComponent implements OnInit {
  @Input() technicalSkills: TechnicalSkill[]; 
  gridModels: TechnicalSkillsGridDto[];

  constructor(private _durationService: DurationService) { }

  ngOnInit() {
    this.toGridDto(this.technicalSkills);
  }

  toGridDto(technicalSkills: TechnicalSkill[]): void {
    let distinctCategories = technicalSkills
      .map(item => item.category)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(item => new TechnicalSkillsGridDto(item));

    for (let category of distinctCategories) {
      let skillsOfCategory = technicalSkills.filter(o => o.category == category.category);
      
      for (const skillOfCategory of skillsOfCategory) {
        let skillDto: TechnicalSkillGridDto = new TechnicalSkillGridDto();

        skillDto.category = skillOfCategory.category;
        skillDto.name = skillOfCategory.name; 
        skillDto.starred = skillOfCategory.starred; 
        skillDto.useHistory = skillOfCategory.useHistory;
        skillDto.workSamples = skillOfCategory.workSamples;
        skillDto.totalYearsExp = this._durationService.calculateTotalDuration(skillOfCategory.useHistory); 

        category.skills.push(skillDto);
      }

      category.skills.sort(a => a.totalYearsExp)
    }

    this.gridModels = distinctCategories.sort((a, b) => a.category.localeCompare(b.category));
  }

  calculateExperience(yearsExp: number): string {
    let yearsExpFloored = Math.floor(yearsExp);

    if(yearsExpFloored < 1) {
      return '<1 year';
    }
    else if(yearsExpFloored == 1) {
      return '1 year';
    }
    else {
      return `${yearsExpFloored} years`;
    }
  }

  isCurrentlyUsing(technicalSkill: TechnicalSkill): boolean {
    const lastIndex = technicalSkill.useHistory.length - 1;
    return technicalSkill.useHistory[lastIndex].toDate == null;
  }
}
