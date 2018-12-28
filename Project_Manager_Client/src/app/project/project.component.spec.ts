import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Project } from '../model/project';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../pipes/convert-date.pipe';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { Options } from 'ng5-slider';
import { debounceTime, map } from 'rxjs/operators';
import { AppService } from '../Services/app.service';
import { SharedService } from '../task/sharedservice/taskss.service';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { SortByPipe } from '../pipes/sort.pipe';
import { FindNoOfTaskPipe } from '../pipes/findNoOfTasks.pipe';
import { ProjectComponent } from './project.component';
import { FindTaskByTaskPipe } from '../pipes/find-task-by-task.pipe';
import { FindTaskByIdPipe } from '../pipes/find-task-by-id.pipe';
import { NgbModule,  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { query } from '@angular/core/src/render3';
import { DatePipe } from '@angular/common';
import { projectData } from '../unit-test/mock-request/addProject';
import { HttpClientModule } from '@angular/common/http';
import { findprojectPipe } from '../pipes/findproject.pipe';

describe('ProjectComponent', () => {
  let specObj: any = {};
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NgbModule, Ng5SliderModule, HttpClientModule ],
      declarations: [ ProjectComponent, findprojectPipe, SortByPipe, FindTaskByIdPipe, FindNoOfTaskPipe ],
      providers: [NgbDateFRParserFormatter, AppService, SharedService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    specObj.project = projectData.data;
    specObj.fixture = TestBed.createComponent(ProjectComponent);
    specObj.component = specObj.fixture.componentInstance;
    specObj.fixture.detectChanges();
  });

  it('should create', () => {
    expect(specObj.component).toBeTruthy();
  });

  it('project name should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-project')).nativeElement;
    addTaskButton.click();
    expect(specObj.project.projectName).toBeTruthy();
  });

  it('priorty should be greater than 0', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-project')).nativeElement;
    addTaskButton.click();
    expect(specObj.project.priorty).toBeGreaterThan(0);
  });

  it('priorty should be less than or equal to 30', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-project')).nativeElement;
    addTaskButton.click();
    expect(specObj.project.priorty).toBeLessThanOrEqual(30);
  });

  it('start date should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-project')).nativeElement;
    addTaskButton.click();
    expect(specObj.project.startDate).toBeTruthy();
  });

  it('end date should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-project')).nativeElement;
    addTaskButton.click();
    expect(specObj.project.endDate).toBeTruthy();
  });

  it('manager should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-project')).nativeElement;
    addTaskButton.click();
    expect(specObj.project.manager).toBeTruthy();
  });
});
