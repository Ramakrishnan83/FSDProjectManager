import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient, private util: UtilService) { 
    // console.log(this.util.host);
  }

 
  // Add User
  addUser(user) {
    return this.http.post(`${this.util.host}/api/users/addUser/`, user);
    
  }

  // Get User
  getUser() {
    return this.http.get(`${this.util.host}/api/users/getUser/`);
  }

  // Update User
  updateUser(user) {
    return this.http.post(`${this.util.host}/api/users/updateUser/`, user);
  }

  // Delete User
  deleteUser(user) {
    return this.http.post(`${this.util.host}/api/users/deleteUser/`, user);
  }

  // Add Project
  addProject(project) {
    return this.http.post(`${this.util.host}/api/projects/addProject/`, project);
  }

  // Get Project
  getProject() {
    return this.http.get(`${this.util.host}/api/projects/getProject/`);
  }

  // Update Project
  updateProject(project) {
    return this.http.post(`${this.util.host}/api/projects/updateProject/`, project);
  }

  // Delete Project
  deleteProject(project) {
    return this.http.post(`${this.util.host}/api/projects/deleteProject/`, project);
  }

  // Add Task
  addTask(task) {
    return this.http.post(`${this.util.host}/api/tasks/addTask/`, task);
  }

  // Get Task
  getTask() {
    return this.http.get(`${this.util.host}/api/tasks/getTask/`);
  }

  // Update Task
  updateTask(task) {
    return this.http.post(`${this.util.host}/api/tasks/updateTask/`, task);
  }

  // Delete Task
  deleteTask(task) {
    return this.http.post(`${this.util.host}/api/tasks/deleteTask/`, task);
  }
}
