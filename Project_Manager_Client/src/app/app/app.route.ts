import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from '../task/view/view.component';
import { AddComponent } from '../task/add/add.component';
import { UserComponent} from '../user/user.component';
import { ProjectComponent } from '../project/project.component';


const routes: Routes = [
    {path: 'view task', component: ViewComponent},
    {path: 'add task', component: AddComponent},
    {path: 'add project', component: ProjectComponent},
    //code for final project
    {path: 'add user', component: UserComponent},

    {path: '**', pathMatch:'full', redirectTo: '/view task'}
    // {path: '**', pathMatch:'full', component: NotFoundComponent}
  ]
  
export const routing = RouterModule.forRoot(routes);