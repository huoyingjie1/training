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
import { LedComponentComponent } from './led-component/led-component.component';
import { DisplayComponentComponent } from './display-component/display-component.component';
import { WebcamComponentComponent } from './webcam-component/webcam-component.component';
import { LockComponentComponent } from './lock-component/lock-component.component';
import { DoorComponentComponent } from './door-component/door-component.component';
import { HumidifierComponentComponent } from './humidifier-component/humidifier-component.component';
import { Temhum2ComponentComponent } from './temhum2-component/temhum2-component.component';
import { Temhum1ComponentComponent } from './temhum1-component/temhum1-component.component';
import { ProductsComponentComponent } from './products-component/products-component.component';
import { AlarmComponentComponent } from './alarm-component/alarm-component.component';
import { FireComponentComponent } from './fire-component/fire-component.component';
import { WaterComponentComponent } from './water-component/water-component.component';
import { DevicestatusComponentComponent } from './devicestatus-component/devicestatus-component.component';

const mqtChildrenRoutes:Routes=[
  { path: 'tem_hum1', component: Temhum1ComponentComponent },
  { path: 'tem_hum2', component: Temhum2ComponentComponent },
  { path: 'fan', component: FanComponentComponent },
  { path: 'air', component: AirComponentComponent },
  { path: 'humidifier', component: HumidifierComponentComponent },
  { path: 'led', component: LedComponentComponent },
  { path: 'webcam', component: WebcamComponentComponent },
  { path: 'lock', component: LockComponentComponent },
  { path: 'door', component: DoorComponentComponent },
  { path: 'alarm', component: AlarmComponentComponent },
  { path: 'fire', component: FireComponentComponent },
  { path: 'water', component: WaterComponentComponent },
  { path: 'user', component: UserManagementComponentComponent }, 
  { path: 'product', component: ProductComponentComponent }, 
  { path: 'exit', component: ExitComponentComponent }, 
  { path: 'products', component: ProductsComponentComponent }, 
  { path: 'devicestatus', component: DevicestatusComponentComponent }, 
  { path: 'display', component: DisplayComponentComponent }, 
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
    LedComponentComponent,
    DisplayComponentComponent,
    WebcamComponentComponent,
    LockComponentComponent,
    DoorComponentComponent,
    HumidifierComponentComponent,
    Temhum2ComponentComponent,
    Temhum1ComponentComponent,
    ProductsComponentComponent,
    AlarmComponentComponent,
    FireComponentComponent,
    WaterComponentComponent,
    DevicestatusComponentComponent
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
