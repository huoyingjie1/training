import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Component({
  selector: 'app-products-component',
  templateUrl: './products-component.component.html',
  styleUrls: ['./products-component.component.css']
})
export class ProductsComponentComponent implements OnInit {

  myForm: FormGroup;
  ProductName: AbstractControl;
   GmtCreate: AbstractControl;
   NodeType: AbstractControl;
   DataFormat: AbstractControl;
   AuthType: AbstractControl;
   ProductKey: AbstractControl;
   DeviceCount: AbstractControl;
   product$: Observable<Product>;
   baseUrl = 'http://192.168.43.177:8000/';
   currentUser:Product;
   
   constructor(private fb: FormBuilder,private httpClient: HttpClient){
     this.myForm=this.fb.group({
       'GmtCreate':[''],
       'ProductName':[''],
       'NodeType':[''],
       'DataFormat':[''],
       'AuthType':[''],
       'ProductKey':[''],
       'DeviceCount':[''],
     });

     this.GmtCreate = this.myForm.controls['GmtCreate'];
     this.ProductName = this.myForm.controls['ProductName'];
     this.NodeType = this.myForm.controls['NodeType'];
     this.DataFormat = this.myForm.controls['DataFormat'];
     this.AuthType = this.myForm.controls['AuthType'];
     this.ProductKey = this.myForm.controls['ProductKey'];
     this.DeviceCount = this.myForm.controls['DeviceCount'];
   }

   ngOnInit():void{
      this.product$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'product');
   }
   select(u:Product){
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }
   search(){
      if (this.GmtCreate.value){
        this.product$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'product/' +this.GmtCreate.value);
      }else {
        this.product$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'product');
      }
   }
   add(){
     console.log(this.myForm.value);
      this.httpClient.post(this.baseUrl + 'product',this.myForm.value).subscribe(
        (val:any) => {
          if(val.succ){
            alert('添加成功！');
          }
        }
      );
   }
   delete(){
     if(!this.currentUser){
       alert('必须先选择用户!');
     }
     else{
       this.httpClient.delete(this.baseUrl + 'product/' + this.currentUser.ProductName+'/'+this.currentUser.ProductKey).subscribe(
         (val:any) => {
           if(val.succ){
             alert('删除成功！');
           }
         }
       )
     }
   }

}
