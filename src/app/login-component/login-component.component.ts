import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  password: AbstractControl;
  baseUrl = 'http://192.168.43.177:8080/';
  users$: Observable<User>;


  constructor(private fb: FormBuilder, private httpClient: HttpClient, private authService: AuthService) {
    this.myForm = this.fb.group({
      'userName': [''],
      'password': [''],
    });

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];


  }

  ngOnInit(): void {
  }

  islogin() {
    this.httpClient.post(this.baseUrl + 'login', this.myForm.value).subscribe(
      (resp: any) => {
        if (this.myForm.valid) {
          if (resp.succ) {
            console.log(this.myForm.value);
            this.authService.login();
          } else {
            alert("登录失败");
          }
        } else {
          this.authService.logout();
        }

      }
    );
  }



}

