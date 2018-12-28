import { Component, OnInit } from '@angular/core';
import { AppService } from '../../Services/app.service';
import { TaskDetails } from '../../model/task';
import { Observable } from 'rxjs/index';
import { debounceTime, map } from 'rxjs/operators';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../sharedservice/taskss.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  
  sortValue: number = 1;
  taskData: any = [];
  errorMessage: any;
  taskInfo: any = [];
  taskReframeInfo: any = [];
  path: string[];
  selectedProject: any;
  taskDetails = new TaskDetails();
  public searchProject: any;
  public formatterProject: any;
  projectInformation: any;
  projectSearchModal: any;
  projectSearchBtnDisable: boolean = false;
  taskAvailable: boolean = false;

  constructor(private service: AppService, private modalService: NgbModal, private shared: SharedService, private router: Router) { 
    this.shared.TaskModel = new TaskDetails();
  }

  ngOnInit() {
    this.getTask();
    this.getProject();
  }

  getTask() {
    
    this.service.getTask().subscribe(
      (res: any) => {
        if(res.success && res.success !== false) {
          this.taskData = res.data;
          this.taskInfo = this.taskData;
          if (this.taskData.length > 0) {
            this.taskAvailable = true;
          } else {
            this.taskAvailable = false;
          }
        } else {
          this.errorMessage = 'Error Description: ' + res.message;
        }
      }
    )
  }

  
  endTask(task) {
    task.status = true;
    task.endDate = new Date();
    this.service.updateTask(task).subscribe(
      (res: any) => {
        if (res.success && res.success !== false) {
        }
      }
    )
  }

  sortTask(task: string) {
    this.path = task.split('.');
    this.sortValue = this.sortValue * (-1);
    return false;
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

  selectProject() {
    this.taskData = [];
    this.taskInfo.filter(item => {
      if ((this.selectedProject._id === item.project)) {
        this.taskData.push(item);
      } else 
      if (!this.selectedProject._id) {
        this.taskData.push(item);
      }
    });
    this.projectSearchModal = this.selectedProject.projectName;
  }

  getProject() {
    this.service.getProject().subscribe(
      (res: any) => {
        if (res.success && res.success !== false) {
          if (res.data.length >= 1) {
            this.projectInformation = res.data;
            this.projectNgBootstrapTypeahead(this.projectInformation);
          } else {
            this.projectSearchBtnDisable = true;
          }
        } else {
          this.errorMessage = 'Error Description' + res.message;
        }
      }
    )
  }

  open(projectSearch) {
    this.modalService.open(projectSearch);
  }

  editTask(task) {
    this.shared.TaskModel = task;
    this.router.navigateByUrl('/add task');
  }
}
