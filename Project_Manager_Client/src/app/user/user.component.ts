import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AppService } from '../Services/app.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
//import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userDetails = new User();
  addupdbutton = 'Add';
  userData: any;
  selecteduser: any;
  searchUser: any;
  path: string[];
  sortValue: number = 1 
  userAvailable: boolean = false;
  UserDelete: any;
  errorMessage: any;
  constructor(private service: AppService, private modalService: NgbModal) {
    //this.shared.TaskModel = new TaskDetailsModel();
  }

  ngOnInit() {
    this.getUser();
  }

 addUser(user, userForm) {
    userForm.reset();
    //console.log (user);
    if (this.addupdbutton === 'Add') {
      this.service.addUser(user).subscribe(
        (res: any) => {
          if(res.success && res.success !== false) {
            this.getUser();
            this.userDetails = new User();        
          } else {
            this.errorMessage = 'Error Description: ' + res.message;
          }
        }
      )
    } else {
      user._id = this.selecteduser;
      this.service.updateUser(user).subscribe(
        (data) => {
          this.addupdbutton = 'Add';
          this.getUser();
          this.userDetails = new User();
        }
      )
    }    
  }

  getUser() {
    this.service.getUser().subscribe(
      (data: any) => {     
        if (data) {
          this.userData = data.data;
          //console.log(this.userData);
          if (data.length > 0) {
            this.userAvailable = true;
          } else {
            this.userAvailable = false;
          }     
        } 
      }
    )
  }

  editUser(user) {
    this.selecteduser = user._id;
    this.addupdbutton = 'Update';
    this.setUserInfo(user);
  }

  setUserInfo(userInfo) {
    this.userDetails.firstName = userInfo.firstName;
    this.userDetails.lastName = userInfo.lastName;
    this.userDetails.employeeId = userInfo.employeeId;
  }

  open(content, user) {
    this.modalService.open(content);
    this.UserDelete = user;
  }

  deleteUser(user) {
    this.service.deleteUser(user).subscribe(
      (data) => {
        if (data) {
          this.getUser();
        }
      }
    )
  }

  sortUser(user: string) {
    this.path = user.split('.');
    this.sortValue = this.sortValue * (-1);
    return false;
  }
}
