import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '../model/user';
import { AppService } from '../Services/app.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../task/sharedservice/taskss.service';
import { TaskDetails } from '../model/task';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { userdata} from '../unit-test/mock-request/addUser';
import { SortByPipe } from '../pipes/sort.pipe';
import { finduserPipe } from '../pipes/finduser.pipe';

describe('UserComponent', () => {
  let user: any;
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule ],
      declarations: [ UserComponent,SortByPipe,finduserPipe],
      providers: [ AppService, SharedService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    user = userdata.data;
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
