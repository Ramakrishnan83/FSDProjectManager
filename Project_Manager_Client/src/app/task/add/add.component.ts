import { Component, OnInit } from '@angular/core';
import { TaskDetails } from '../../model/task';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../../pipes/convert-date.pipe';
import { FindTaskByTaskPipe } from '../../pipes/find-task-by-task.pipe';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { Options } from 'ng5-slider';
import { Observable } from 'rxjs/index';
import { debounceTime, map } from 'rxjs/operators';
import { AppService } from '../../Services/app.service';
import { Router } from '@angular/router';
import { SharedService } from '../sharedservice/taskss.service';
import 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  taskDetails = new TaskDetails();
  starting_date:any = {};
  ending_date:any = {};
  private startDate: NgbDate;
  private endDate: NgbDate;
  public hoveredDate: NgbDate;
  selectedProject: any;
  public priorty: number = 0;
  private priortyBar: any;
  public priortyOptions: Options = {
    floor: 0,
    ceil: 30,
    step: 1,
    minLimit: 1,
    maxLimit: 30
  };
  public priortyValidation: boolean = false;
  projectEnableBtn: boolean = true;
  userEnableBtn: boolean = true;
  buttonValue: any = 'Add';
  srchprojbtndisabled: boolean = false;
  prntTaskbtndisabled: boolean = false;
  prntTasksrchbtndiabled: boolean = false;
  usersrchbtndisabled: boolean = false;
  public searchProject: any;
  public searchParent: any;
  public searchUser: any;
  public formatterProject: any;
  public formatterParent: any;
  public formatterUser: any;
  projectInformation: any;
  errorMessage: any;
  parentTask: boolean = false;
  parentTaskNameModel: any;
  userInforamtion: any;
  parentTaskInfo: any = [];
  userName: any = [];
  selectedUser: any;
  private taskValues:  any;
  
  constructor(private service: AppService, private _date: DateFormatPipe, private calendar: NgbCalendar, private _dateParser: NgbDateFRParserFormatter,
    private modalService: NgbModal, private router: Router, private shared: SharedService) {
      this.taskValues = this.shared.TaskModel; // TaskModel should have the information when we select Edit Task

    }
  
  
  ngOnInit() {
    this.loadProjectDetails();
    this.loadTaskDetails();
    this.loadUserDetails();
    this.editTaskValues();
  }

  
  editTaskValues() {
    this.buttonValue = (this.taskValues && this.taskValues.project && this.taskValues.task && this.taskValues.priorty && this.taskValues.user) ? 'Update' : 'Add';
    this.taskDetails.task = (this.taskValues && this.taskValues.task) ? this.taskValues.task : '';
    this.priorty = (this.taskValues && this.taskValues.priorty) ? this.taskValues.priorty : 0;
    this.taskDetails.parentTask = (this.taskValues && this.taskValues.parentTask) ? this.taskValues.parentTask : false;
    var date1 = new Date();
    var ngbDateStart = { day: date1.getUTCDate(), month: date1.getUTCMonth() + 1, year: date1.getUTCFullYear()};
    var ngbDateEnd = { day: date1.getUTCDate() + 1, month: date1.getUTCMonth() + 1, year: date1.getUTCFullYear()};    
    this.starting_date = (this.taskValues && this.taskValues.startDate) ? this.dateconversion(this.taskValues.startDate):ngbDateStart;
    this.ending_date = (this.taskValues && this.taskValues.endDate) ? this.dateconversion(this.taskValues.endDate):ngbDateEnd;
    this.prntTaskbtndisabled = (this.taskValues  && this.taskValues.project && this.taskValues.task && this.taskValues.user) ? true : false;
    this.srchprojbtndisabled = (this.taskValues && this.taskValues.project) ? true : false;
  }

  
  loadProjectDetails() {
    this.service.getProject().subscribe(
      (res: any) => {
        if (res.success && res.success !== false) {
          if (res.data.length >= 1) {
            this.projectInformation = res.data;
            this.projectNgBootstrapTypeahead(this.projectInformation);
            this.setProjectInformation(this.projectInformation);
          } else {
            this.srchprojbtndisabled = true;
          }
    
        } else {
          this.errorMessage = 'Error Description' + res.message;
        }
      }
    )
  }

  
  projectNgBootstrapTypeahead(name) {
    this.searchProject = (text$: Observable<string>) =>
    text$.pipe(debounceTime(200), map(term => term === '' ? [] : name.filter(project =>
        project.projectName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    ));
    this.formatterProject = (a: {projectName: string}) => {
      return a.projectName;
    };
  }

    setProjectInformation(projectInfo) {
    if (this.taskValues && this.taskValues.project && projectInfo) {
      projectInfo.filter(item => {
        if (item._id === this.taskValues.project) {
          this.selectedProject = item;
          this.taskDetails.project = item.projectName;
          this.projectEnableBtn = (this.taskValues && this.taskValues.project && this.taskDetails.project) ? false : true;
        }
      })
    }
  }

  open(managerModel) {
    this.modalService.open(managerModel);
  }


  loadUserDetails() {
    this.service.getUser().subscribe(
      (res: any) => {
        if (res) {
          if (res.data.length >= 1) {
            this.userInforamtion = res.data;
            this.userInforamtion.filter(item => {
              this.userName.push({'name': item.firstName + ', ' + item.lastName, '_id': item._id, 'employeeId': item.employeeId});
            });
            this.userNgBootstrapTypeahead(this.userName);
            this.setUserInformation(this.userName);                 
          } else {
            this.usersrchbtndisabled = true;
          }
        } else {
          this.errorMessage = 'Error Description: ' + res.message;
        }
      }
    )
  }

  
  userNgBootstrapTypeahead(user) {
    this.searchUser = (text$: Observable<string>) =>
    text$.pipe(debounceTime(200), map(term => term === '' ? [] : user.filter(project =>
        project.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    ));
    this.formatterUser = (a: {name: string}) => {
      return a.name;
    };
  }

  
  setUserInformation(userInfo) {
    if (this.taskValues && this.taskValues.user && userInfo) {
      userInfo.filter(item => {
        if (item._id === this.taskValues.user) {
          this.taskDetails.user = item.name;
          this.selectedUser = item;
          this.userEnableBtn = (this.taskValues && this.taskValues.user && this.taskDetails.user) ? false : true; 
        }
      })
    }
  }

    selectProject() {
    this.projectEnableBtn = (this.selectedProject && this.selectedProject._id) ? false : true;
    this.taskDetails.project = this.selectedProject.projectName;
  }

  selectUser() {
    this.userEnableBtn = (this.selectedUser && this.selectedUser._id) ? false : true;
    this.taskDetails.user = this.selectedUser.name;
  }

  selectParentTask() {
    this.taskDetails.parent = this.parentTaskNameModel.task;
  }

  resetForm() {
    this.taskValues = new TaskDetails();
    this.userEnableBtn = true;
    this.projectEnableBtn = true;
    this.selectedUser = '';
    this.parentTaskNameModel = '';
    this.selectedProject = '';
    //Reset the dates as per the rules
    this.ending_date={};
    this.starting_date={};
    this.errorMessage = '';
    //this.startDate = this.calendar.getToday();
    //this.endDate = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
    
    this.srchprojbtndisabled = false;
    this.prntTaskbtndisabled = false;
    if (this.buttonValue === 'Update') {
      this.buttonValue = 'Add';
    }
  }
  
  addTask(task, taskForm) {
    if (this.taskDetails.parentTask) // to ensure if the value is checked set the priority to 0 and dates to blank
    {
      this.ending_date={};
      this.starting_date={};
      this.priorty=0;    
    }
    
    if (this.taskValues && this.taskValues._id) {
      task._id = this.taskValues._id;
    }

    task.project = this.selectedProject._id;
    task.priorty = this.priorty;
    task.endDate = new Date(`${this.ending_date.year}/${this.ending_date.month}/${this.ending_date.day}`);
    task.startDate = new Date(`${this.starting_date.year}/${this.starting_date.month}/${this.starting_date.day}`);
    task.user = (this.selectedUser && this.selectedUser._id) ? this.selectedUser._id : '';
    task.parent = (this.parentTaskNameModel && this.parentTaskNameModel._id) ? this.parentTaskNameModel._id : null;
    if (task.startDate && task.endDate){
      if (task.startDate > task.endDate){
        this.errorMessage="End date should be greater than start date"; 
        return;
      }
    }
    taskForm.reset();
    if (this.buttonValue === 'Add') {
      this.service.addTask(task).subscribe(
        (res: any) => {
          if(res.success && res.success !== false) {
            this.resetModel();
            this.loadTaskDetails();
            this.router.navigateByUrl('/view task');      
          } else {
            this.errorMessage = 'Error Description: ' + res.message;
          }
        }
      )
    } else {
      this.service.updateTask(task).subscribe(
        (data) => {
          this.buttonValue = 'Add';
          this.resetModel();
          this.router.navigateByUrl('/view task');   
        }
      )
    }
  
  }

  resetModel() {
    this.taskDetails = new TaskDetails();
  }

  loadTaskDetails() {
    this.service.getTask().subscribe(
      (res: any) => {
        if(res.success && res.success !== false) {
          if (res.data.length >= 1) {
            res.data.filter(item => {
                this.parentTaskInfo.push(item);
            })
            this.parentNgBootstrapTypeahead(this.parentTaskInfo);              
            this.setParentInformation(this.parentTaskInfo);
          } else {
            this.prntTasksrchbtndiabled = true;
          }
        } else {
          this.errorMessage = 'Error Description : ' + res.message;
        }
      }
    )
  }

  parentNgBootstrapTypeahead(ptTaskName) {
    this.searchParent = (text$: Observable<string>) =>
    text$.pipe(debounceTime(200), map(term => term === '' ? [] : ptTaskName.filter(project =>
        project.task.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    ));
    this.formatterParent = (a: {task: string}) => {
      return a.task;
    };
  }

  setParentInformation(taskInfo) {   
    if (this.taskValues && this.taskValues.parent && taskInfo) {
      taskInfo.filter(item => {
        if (item._id === this.taskValues.parent) {
          this.taskDetails.parent = item.task;
          this.parentTaskNameModel = item;
        }
      })
    }
  }

  isNumber(value: any): boolean {
    return !isNaN(this.toInteger(value));
}

 toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

  dateconversion(value:any){
      if (value) {
          const dateParts = value.trim().split('-');
          return {year: this.toInteger(dateParts[0]), 
                  month: this.toInteger(dateParts[1]), 
                  day: this.toInteger(dateParts[2])};
      }   
      return null;
  }


}


