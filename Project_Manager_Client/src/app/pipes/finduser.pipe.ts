import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'finduser'
})

export class finduserPipe implements PipeTransform {
    transform(items: any[], searchValue: any): any[] {
        if (!items) return [];
        return items.filter(item => {
            // This condition will execute for Add User screen filter
            if ( searchValue && item.firstName.toLowerCase().indexOf(searchValue.toLowerCase()) === -1 &&
                item.lastName.toLowerCase().indexOf(searchValue.toLowerCase()) === -1 &&
                ('' + item.employeeId).toLowerCase().indexOf(searchValue.toLowerCase()) === -1
            ) {
                return false;
            }
            return true;
        });
    }
}