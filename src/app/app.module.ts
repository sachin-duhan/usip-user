import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import * as Material from '@angular/material';

// this is for the requests!!
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

// toast message:
import { ToastrModule } from 'ngx-toastr';

// Service are meant to be addded to the providers
import { InternService } from './service/intern.service';
import { RegisterService } from './service/register.service';
import { OfficerService } from './service/officer.service';
import { NotifyService } from './service/notify.service';
import { LoginService } from './service/login.service';
import { ReportService } from './service/report.service';
import { TokenInterceptorService } from './service/token-interceptor.service';

// views and the layout imports!!
import { AppComponent } from './app.component';
import { FooterComponent } from './component/utility/footer/footer.component';
import { IndexComponent } from './component/index/index.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './component/utility/navbar/navbar.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { NotificationComponent } from './component/notification/notification.component';
import { InternDashNavComponent } from './component/utility/intern-dash-nav/intern-dash-nav.component';
import { InternDashComponent } from './component/intern-dash/dash/dash.component';
import { BankDetailsFormComponent } from './component/intern-dash/bank-details-form/bank-details-form.component';
import { InternNotificationComponent } from './component/intern-dash/intern-notification/intern-notification.component';
import { InternProfileComponent } from './component/intern-dash/intern-profile/intern-profile.component';
import { InternOfficerComponent } from './component/intern-dash/intern-officer/intern-officer.component';
import { InternReportComponent } from './component/intern-dash/intern-report/intern-report.component';
import { InternTasksComponent } from './component/intern-dash/intern-tasks/intern-tasks.component';
import { InternSettingsComponent } from './component/intern-dash/intern-settings/intern-settings.component';
import { InternPasswordUpdateComponent } from './component/intern-dash/intern-password-update/intern-password-update.component';
import { SpinnerComponent } from './component/utility/spinner/spinner.component';
import { AuthGuard } from './auth.guard';
import { ImprovementsComponent } from './component/intern-dash/improvements/improvements.component';
import { TasksService } from './service/tasks.service';
import { RoleGuardService } from './role-guard.service';
import { HomeComponent } from './component/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    IndexComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    NotificationComponent,
    InternDashComponent,
    BankDetailsFormComponent,
    InternDashNavComponent,
    InternNotificationComponent,
    InternProfileComponent,
    InternOfficerComponent,
    InternReportComponent,
    InternTasksComponent,
    InternSettingsComponent,
    InternPasswordUpdateComponent,
    SpinnerComponent,
    ImprovementsComponent,
    HomeComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FileUploadModule,
    LayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),

    Material.MatGridListModule,
    Material.MatCardModule,
    Material.MatMenuModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatSnackBarModule,
    Material.MatIconModule,
    Material.MatButtonModule,
    Material.MatSelectModule,
    Material.MatDialogModule,
    Material.MatTooltipModule,
    Material.MatSlideToggleModule,
    Material.MatRadioModule,
    Material.MatToolbarModule,
    Material.MatSidenavModule,
    Material.MatInputModule,
    Material.MatListModule,
    Material.MatFormFieldModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatExpansionModule,
    Material.MatBottomSheetModule,
    Material.MatCheckboxModule,
    Material.MatChipsModule,
    Material.MatTabsModule,
    Material.MatStepperModule,
  ],
  exports: [HttpClientModule,
    BrowserModule,
    LayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,

    Material.MatGridListModule,
    Material.MatCardModule,
    Material.MatMenuModule,
    Material.MatSnackBarModule,
    Material.MatIconModule,
    Material.MatButtonModule,
    Material.MatSelectModule,
    Material.MatDatepickerModule,
    Material.MatDialogModule,
    Material.MatTooltipModule,
    Material.MatSlideToggleModule,
    Material.MatNativeDateModule,
    Material.MatRadioModule,
    Material.MatToolbarModule,
    Material.MatSidenavModule,
    Material.MatInputModule,
    Material.MatListModule,
    Material.MatFormFieldModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatExpansionModule,
    Material.MatBottomSheetModule,
    Material.MatCheckboxModule,
    Material.MatChipsModule,
    Material.MatTabsModule,
    Material.MatStepperModule
  ],
  providers: [
    InternService,
    RegisterService,
    OfficerService,
    TasksService,
    NotifyService,
    ReportService,
    LoginService,
    RoleGuardService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    BankDetailsFormComponent,
    InternPasswordUpdateComponent,
    InternNotificationComponent,
    InternProfileComponent,
    InternOfficerComponent,
    InternReportComponent,
    InternTasksComponent,
    ImprovementsComponent
  ]
})
export class AppModule { }
