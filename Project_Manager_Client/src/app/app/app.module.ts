import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import { routing } from './app.route';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from '../task/add/add.component';
import { ViewComponent } from '../task/view/view.component';
import { UserComponent} from '../user/user.component';
import { FindTaskByIdPipe } from '../pipes/find-task-by-id.pipe';
import { FindTaskByTaskPipe } from '../pipes/find-task-by-task.pipe';
import { SortByPipe } from '../pipes/sort.pipe';
import { finduserPipe } from '../pipes/finduser.pipe';
import { findprojectPipe } from '../pipes/findproject.pipe';

import { DatePipe } from '@angular/common';
import { SharedService } from '../task/sharedservice/taskss.service';
import { AppService } from '../Services/app.service';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../pipes/convert-date.pipe';
import { FindNoOfTaskPipe } from '../pipes/findNoOfTasks.pipe';
import { ProjectComponent } from '../project/project.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { DateFormatPipe } from '../pipes/date-format.pipe'


@NgModule({
  imports: [
    CommonModule, BrowserModule, FormsModule, routing, HttpClientModule, NgbModule,Ng5SliderModule
  ],
  //providers: [DatePipe,{provide: NgbDateParserFormatter,],
  providers: [ AppService, NgbActiveModal, DateFormatPipe, NgbDateFRParserFormatter, SharedService, FindTaskByIdPipe, FindNoOfTaskPipe ],
  declarations: [AppComponent, HeaderComponent, AddComponent, ViewComponent,  
    FindTaskByIdPipe,FindTaskByTaskPipe,SortByPipe,UserComponent,finduserPipe,findprojectPipe, FindNoOfTaskPipe,ProjectComponent],
  bootstrap:[AppComponent]
})
export class AppModule { }
