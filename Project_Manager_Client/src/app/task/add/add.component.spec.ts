import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetails } from '../../model/task';
import { NgbDate, NgbCalendar, NgbModal, NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../../pipes/convert-date.pipe';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { Options } from 'ng5-slider';
import { Observable } from 'rxjs/index';
import { debounceTime, map } from 'rxjs/operators';
import { AppService } from '../../Services/app.service';
import { SharedService } from '../sharedservice/taskss.service';
//import { HttpModule, Http, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './add.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule  } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { taskData } from '../../unit-test/mock-request/addTask';

describe('AddTaskComponent', () => {
  let specObj: any = {};
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,Ng5SliderModule, NgbModule, HttpClientModule, RouterTestingModule ],
      declarations: [ AddComponent ],
      providers: [AppService, SharedService, DateFormatPipe, NgbDateFRParserFormatter, NgbModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    specObj.taskDetails = taskData.data;
    specObj.fixture = TestBed.createComponent(AddComponent);
    specObj.component = specObj.fixture.componentInstance;
    specObj.fixture.detectChanges();
  });

  it('should create', () => {
    expect(specObj.component).toBeTruthy();
  });

  it('project name should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.project).toBeTruthy();
  });

  it('task name should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.task).toBeTruthy();
  });

  it('priorty should be greater than 0', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.priorty).toBeGreaterThan(0);
  });

  it('priorty should be less than or equal to 30', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.priorty).toBeLessThanOrEqual(30);
  });

  it('start date should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.startDate).toBeTruthy();
  });

  it('end date should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.endDate).toBeTruthy();
  });

  it('user should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.user).toBeTruthy();
  });
});
