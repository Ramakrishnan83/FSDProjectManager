import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../pipes/convert-date.pipe';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { Options } from 'ng5-slider';
import { Observable } from 'rxjs/index';
import { debounceTime, map } from 'rxjs/operators';
import { AppService } from '../Services/app.service';
import { SharedService } from '../task/sharedservice/taskss.service';
import { TaskDetails } from '../model/task';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectDetails = new Project();
  setStartEndDate: boolean = false;
  public priorty: number = 0;
  public priortyOptions: Options = {
    floor: 0,
    ceil: 30,
    step: 1,
    minLimit: 1,
    maxLimit: 30
  };
  public search: any;
  public formatter: any;
  userInforamtion: any;
  errorMessage: any;
  selectedManager: any;
  managerName: any = [];
  editId: any;
  projectInformation: any;
  searchProject: any;
  mgrdisabledbutton: boolean = true;
  path: string[];
  sortValue: number = 1 // For ASC 1, For DESC -1
  deleteProjectInfo: any;
  taskData: any;
  mgrSrchbtndisabled: boolean = false;
  projectAvailable: boolean = false;
  buttonValue: any = 'Add';
  starting_date:any = {};
  ending_date:any = {};
 
  constructor(private service: AppService, calendar: NgbCalendar, private _dateParser: NgbDateFRParserFormatter,
    private modalService: NgbModal, private shared: SharedService) {
      var date1 = new Date();
      var ngbDateStart = { day: date1.getUTCDate(), month: date1.getUTCMonth() + 1, year: date1.getUTCFullYear()};
      var ngbDateEnd = { day: date1.getUTCDate() + 1, month: date1.getUTCMonth() + 1, year: date1.getUTCFullYear()};    
      this.starting_date = ngbDateStart;
      this.ending_date = ngbDateEnd;
      this.shared.TaskModel = new TaskDetails();
  }

  ngOnInit() {
    this.loadTaskDetails();
    this.loadUserDetails();
    this.loadProjectDetails();
    
  }

  
  ngBootstrapTypeahead(managerName) {
    this.search = (text$: Observable<string>) =>
    text$.pipe(debounceTime(200), map(term => term === '' ? [] : managerName.filter(manager =>
        manager.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    ));
    this.formatter = (a: {name: string}) => {
      return a.name;
    };
  }

  loadUserDetails() {
    this.service.getUser().subscribe(
      (res: any) => {
        if (res) {
          if (res.data.length >= 1) {
            this.userInforamtion = res.data;
            
            this.userInforamtion.filter(item => {
              this.managerName.push({'name': item.firstName + ', ' + item.lastName, '_id': item._id, 'employeeId': item.employeeId});
            });
            this.ngBootstrapTypeahead(this.managerName);
          } else {
            this.mgrSrchbtndisabled = true;
          }
        } else {
          this.errorMessage = 'Error Description: ' + res.message;
        }
      }
    )
  }

  open(managerModel, info) {
    this.modalService.open(managerModel);
    if (info) this.deleteProjectInfo = info;
  }

  selectManager() {
    this.mgrdisabledbutton = false;
    this.projectDetails.manager = this.selectedManager.name;
  }

  addProject(project, projectForm) {
    if (!this.setStartEndDate) // to ensure if the value is checked set the priority to 0 and dates to blank
    {
      this.ending_date={};
      this.starting_date={};
      this.priorty=0;    
    }  
    project.priorty = this.priorty;
    project.manager = this.selectedManager._id;
    project.endDate = new Date(`${this.ending_date.year}/${this.ending_date.month}/${this.ending_date.day}`);
    project.startDate = new Date(`${this.starting_date.year}/${this.starting_date.month}/${this.starting_date.day}`);
    if (project.startDate && project.endDate){
      if (project.startDate > project.endDate){
        this.errorMessage="End date should be greater than start date"; 
        return;
      }
    }
    projectForm.reset();
    if (this.buttonValue === 'Add') {
      this.service.addProject(project).subscribe(
        (res: any) => {
          if(res.success && res.success !== false) {    
            this.loadProjectDetails();
            this.resetModel();
          } else {
            this.errorMessage = 'Error Description: ' + res.message;
          }
        }
      )
    } else {
      project._id = this.editId;
      this.service.updateProject(project).subscribe(
        (res: any) => {
          if(res.success && res.success !== false) {    
              this.buttonValue = 'Add';
              this.loadProjectDetails();
              this.resetModel();
          } else {
            this.errorMessage = 'Failed: ' + res.message;
          }
        }
      )
    }
  }

  loadProjectDetails() {
    this.service.getProject().subscribe(
      (res: any) => {
        if (res.success && res.success !== false) {
          this.projectInformation = res.data;
          if (res.data.length > 0) {
            this.projectAvailable = true;
          } else {
            this.projectAvailable = false;
          }
          
        } else {
          this.errorMessage = 'Error Description' + res.message;
        }
      }
    )
  }

  
  resetModel() {
    this.projectDetails = new Project();
    this.errorMessage = '';
  }

  updateProject(project) {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.editId = project._id;
    this.buttonValue = 'Update';
    this.mgrdisabledbutton = false;
    this.setProjectInfo(project);
  }

  setProjectInfo(projectInfo) {
    this.projectDetails.projectName = projectInfo.projectName;
    this.starting_date = this.dateconversion(projectInfo.startDate);
    this.ending_date = this.dateconversion(projectInfo.endDate);
    this.priorty = projectInfo.priorty;
    this.managerName.filter(item => {
      if (item._id === projectInfo.manager) {
        this.projectDetails.manager = item.name;
        this.selectedManager = item._id;
      }
    });
    if (this.starting_date || this.ending_date)
    {this.setStartEndDate = true;}
    else
    {
      this.setStartEndDate = false;
    }
  }

  resetForm() {
    this.mgrdisabledbutton = true;
    this.ending_date={};
    this.starting_date={};
    if (this.buttonValue === 'Update') {
      this.buttonValue = 'Add';
    }
  }

  sortProject(project: string) {
    this.path = project.split('.');
    this.sortValue = this.sortValue * (-1);
    return false;
  }

  loadTaskDetails() {
    this.service.getTask().subscribe(
      (res: any) => {
        if(res.success && res.success !== false) {
          this.taskData = res.data;
        } else {
          this.errorMessage = 'Error Description: ' + res.message;
        }
      }
    )
  }

  deleteProject(project) {
    
    let deleteProjectList: any = [];
    if (this.taskData.length > 1) {
      this.taskData.filter(item => {
        if (project._id === item.project) {
          deleteProjectList.push(item.project);
        }
      });
    } else {
      deleteProjectList.push(project);
    }
    this.service.deleteProject(deleteProjectList).subscribe(
      (res: any) => {
        if (res.success && res.success !== false) {
          this.loadProjectDetails();
        } else {
          this.errorMessage = 'Error description' + res.message;
        }
      }
    )
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
