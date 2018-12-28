import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'findproject'
})

export class findprojectPipe implements PipeTransform {
    transform(items: any[], searchValue: any): any[] {
        if (!items) return [];
        return items.filter(item => {
            // This condition will execute for Add User screen filter
            if ( searchValue && item.projectName.toLowerCase().indexOf(searchValue.toLowerCase()) === -1
            ) {
                return false;
            }
            return true;
        });
    }
}