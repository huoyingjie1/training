import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Device } from './device';

@Component({
  selector: 'app-exit-component',
  templateUrl: './exit-component.component.html',
  styleUrls: ['./exit-component.component.css']
})


export class ExitComponentComponent implements OnInit {

  myForm: FormGroup;
   name: AbstractControl;
   id: AbstractControl;
   productkey: AbstractControl;
   type: AbstractControl;
   status: AbstractControl;
   devices$: Observable<Device>;
   baseUrl = 'http://192.168.43.177:8000/';
   currentUser:Device;
   

   constructor(private fb: FormBuilder,private httpClient: HttpClient){
     this.myForm=this.fb.group({
       'id':[''],
       'productkey':[''],
       'name':[''],
       'type':[''],
       'status':[''],
     });
     this.productkey = this.myForm.controls['productkey'];
     this.name = this.myForm.controls['name'];
     this.id = this.myForm.controls['id'];
     this.type = this.myForm.controls['type'];
     this.status = this.myForm.controls['status'];
   }

   ngOnInit():void{
      this.devices$ = <Observable<Device>>this.httpClient.get(this.baseUrl + 'device');
   }
   search(){
      if (this.id.value){
        this.devices$ = <Observable<Device>>this.httpClient.get(this.baseUrl + 'device/' +this.id.value);
      }else {
        this.devices$ = <Observable<Device>>this.httpClient.get(this.baseUrl + 'device');
      }
   }

   add(){
     console.log(this.myForm.value);
      this.httpClient.post(this.baseUrl + 'device',this.myForm.value).subscribe(
        (val:any) => {
          if(val.succ){
            alert('添加成功！');
          }
        }
      );
   }

   select(u:Device){
     this.currentUser = u;
     this.myForm.setValue(this.currentUser);
   }

   delete(){
     if(!this.currentUser){
       alert('必须先选择用户!');
     }
     else{
       this.httpClient.delete(this.baseUrl + 'device/' + this.currentUser.id+'/'+this.currentUser.productkey+'/'+this.currentUser.name).subscribe(
         (val:any) => {
           if(val.succ){
             alert('删除成功！');
           }
         }
       )
     }
   }
/*
   update(){
    if(!this.currentUser){
      alert('必须先选择用户!');
    }
    else{
      this.httpClient.put(this.baseUrl + 'device' ,this.myForm.value).subscribe(
        (val:any) => {
          if(val.succ){
            alert('修改成功！');
          }
        }
      )
    }
  }*/
  }
