import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './component/index/index.component';
import { NotificationComponent } from './component/notification/notification.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { InternDashComponent } from './component/intern-dash/dash/dash.component';
import { InternNotificationComponent } from './component/intern-dash/intern-notification/intern-notification.component';
import { InternProfileComponent } from './component/intern-dash/intern-profile/intern-profile.component';
import { InternSettingsComponent } from './component/intern-dash/intern-settings/intern-settings.component';
import { InternDashNavComponent } from './component/utility/intern-dash-nav/intern-dash-nav.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // intern routes
  {
    path: 'usip', component: InternDashNavComponent,
    children: [
      { canActivate: [AuthGuard], path: 'intern', component: InternDashComponent },
      { canActivate: [AuthGuard], path: 'intern/notification', component: InternNotificationComponent },
      { canActivate: [AuthGuard], path: 'intern/profile', component: InternProfileComponent },
      { canActivate: [AuthGuard], path: 'intern/settings', component: InternSettingsComponent },
    ]
  },
  // not found URL!
  { path: '**', redirectTo: '/' },
];


@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})

export class AppRoutingModule { }

