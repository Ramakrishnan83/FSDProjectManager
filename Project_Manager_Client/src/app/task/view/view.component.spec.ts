import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../task/sharedservice/taskss.service';
import { ViewComponent } from './view.component';
import { AppService } from '../../Services/app.service';
import { TaskDetails } from '../../model/task';
import { FormsModule } from '@angular/forms';
import { SortByPipe } from '../../pipes/sort.pipe';
import { FindTaskByIdPipe } from '../../pipes/find-task-by-id.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule  } from '@angular/router/testing';
import { getTask } from '../../unit-test/mock-response/getTaskResponse';
import { Observable } from 'rxjs';
import { HttpModule, Http, ConnectionBackend, BaseRequestOptions} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('ViewTaskComponent', () => {
  let specObj: any = {};
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NgbModule, HttpClientModule, RouterTestingModule ],
      declarations: [ ViewComponent, SortByPipe, FindTaskByIdPipe ],
      providers: [ AppService, SharedService,
        {
          provide: Http, useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    specObj.task = getTask.data;
    specObj.fixture = TestBed.createComponent(ViewComponent);
    specObj.component = specObj.fixture.componentInstance;
    specObj.fixture.detectChanges();
  });

  it('should create', () => {
    expect(specObj.component).toBeTruthy();
  });

  });
