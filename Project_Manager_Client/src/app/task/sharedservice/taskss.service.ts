import { Injectable } from '@angular/core';
import { TaskDetails } from '../../model/task';

@Injectable()
export class SharedService {
    public TaskModel: TaskDetails;
}

