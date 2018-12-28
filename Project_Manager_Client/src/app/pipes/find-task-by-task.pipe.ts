import { Pipe, PipeTransform } from '@angular/core';
import { TaskDetails } from '../model/task';
import { provideForRootGuard } from '@angular/router/src/router_module';


@Pipe({
  name: 'filterbyTask'
})

export class FindTaskByTaskPipe implements PipeTransform  {
  transform(tasks: any[],
            taskName: string,
            priFrom: number,
            priTo: number ,
            searchParent: string,
            searchStartdate: any,
            searchEnddate: any
    ): any {
  
    if (!tasks) return [];

    let parenttaskid;
    let startdate:any;
    let enddate:any;
    let strStartDate:string;
    let strEndDate:string;
    let dbFromdate:any ;
    let dbEnddate:any ;
  
    //Get the task id of the search parent
    for (let i=0;i<tasks.length;i++){
      if (tasks[i].task.toLowerCase() == searchParent.toLowerCase()){
        parenttaskid=tasks[i]._id;
      }
    }
    

    return tasks.filter( it => {
       
    dbFromdate = this.dateconversion(it.start_date);
    dbEnddate = this.dateconversion(it.End_Date);
   
    if (priFrom || priTo) 
    {
      if (( it.Priority < priFrom) || (it.Priority > priTo)) {
          return false;
      } 
    } 
      
    if (taskName && it.task.toLowerCase().indexOf(taskName.toLowerCase()) === -1) 
    {
      return false;
    }

      //next condition
    if (searchParent && it.parent != parenttaskid)
    {
      return false;
    }

    
      //next condition
    if (searchStartdate)
     {
      strStartDate = `${searchStartdate.year}/${searchStartdate.month}/${searchStartdate.day}`;
      if (dbFromdate.indexOf(strStartDate) === -1 ){
          return false;
      }
     }

     if (searchEnddate)
     {
      strEndDate = `${searchEnddate.year}/${searchEnddate.month}/${searchEnddate.day}`;
      if (dbEnddate.indexOf(strEndDate) === -1 ){
          return false;
      }
     }
    

      return true;

    } )
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
      let x = {year: this.toInteger(dateParts[0]), 
              month: this.toInteger(dateParts[1]), 
              day: this.toInteger(dateParts[2])};
      return (`${x.year}/${x.month}/${x.day}`);
  }   
  return null;
}

}
