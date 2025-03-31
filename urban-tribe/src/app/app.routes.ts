import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { LoginComponent } from './component/login/login.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';

export const routes: Routes = [
    {  path: '', component: HomeComponent , children: [
        { path: 'about-us', component: AboutUsComponent, data:{animation: 'about-us'} },
        { path: 'profile', component: ProfileComponent, data:{animation: 'profile'} },
        { path: 'login', component: LoginComponent, data:{animation: 'login'} },
        { path: 'dashboard', component: DashboardComponent, data:{animation: 'dashboard'}, children: [
            { path: 'user-list', component: UserListComponent },
            { path: 'user-detail', component: UserDetailComponent},
        ]},
    ]},
];
