import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';


import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ManagementComponentComponent } from './management-component/management-component.component';
import { UserManagementComponentComponent } from './user-management-component/user-management-component.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { ExitComponentComponent } from './exit-component/exit-component.component';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';

import { HttpClientModule } from '@angular/common/http';
import {  FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AirComponentComponent } from './air-component/air-component.component';
import { FanComponentComponent } from './fan-component/fan-component.component';
import { TemComponentComponent } from './tem-component.component/tem-component.component';
import { HumComponentComponent } from './hum-component/hum-component.component';
const mqtChildrenRoutes:Routes=[
  { path: 'tem', component: TemComponentComponent },
  { path: 'hum', component: HumComponentComponent },
  { path: 'fan', component: FanComponentComponent },
  { path: 'air', component: AirComponentComponent },
  { path: 'user', component: UserManagementComponentComponent }, 
  { path: 'product', component: ProductComponentComponent }, 
  { path: 'exit', component: ExitComponentComponent }, 
  { path: '', redirectTo: 'user', pathMatch: 'full' }
];

const routes:Routes = [
  { path: 'home', component: HomeComponentComponent }, 
  { path: '', redirectTo: 'home',pathMatch:'full' }, 
  { path: 'login', component: LoginComponentComponent }, 
  { path: 'management', 
  component: ManagementComponentComponent, 
  children:mqtChildrenRoutes,
  canActivate: [LoginGuard],
 }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    LoginComponentComponent,
    ManagementComponentComponent,
    UserManagementComponentComponent,
    ProductComponentComponent,
    ExitComponentComponent,
    AirComponentComponent,
    FanComponentComponent,
    TemComponentComponent,
    HumComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsModule,
  ],
  providers: [LoginGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
