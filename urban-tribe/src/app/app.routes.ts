import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { LoginComponent } from './component/login/login.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { AuthGuard } from './auth/authguard.guard';
import { PostListComponent } from './component/post-list/post-list.component';

export const routes: Routes = [
    {  path: '', component: HomeComponent , children: [
        { path: 'about-us', component: AboutUsComponent, data:{animation: 'about-us'} },
        { path: 'profile', component: ProfileComponent, data:{animation: 'profile'}, canActivate: [AuthGuard] },
        { path: 'login', component: LoginComponent, data:{animation: 'login'} },
        { path: 'dashboard', component: DashboardComponent, data:{animation: 'dashboard'}, canActivate: [AuthGuard], children: [
            { path: 'user-list', component: UserListComponent },
            { path: 'user-detail', component: UserDetailComponent},
            
        ]},
        { path: 'posts', component: PostListComponent, canActivate: [AuthGuard] },
    ]},
    
];
