import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  SERVER_URL1 = 'http://192.168.43.177:8080/device1'; 
  SERVER_URL2 = 'http://192.168.43.177:8080/device2'; 
  httpOptions = { 
    headers: 
    new HttpHeaders({ 
      'Content-Type': 'application/json' 
    }) 
  }; 
  constructor(private httpClient: HttpClient) { 
    
  }
  // 该函数用于开关灯
  toggleAir(status:number){ 
    const obj = { 
      status: status 
    };
    return this.httpClient.post(this.SERVER_URL1, obj, this.httpOptions); 
  }

  // 该函数用于获取灯的状态 
  getAir(){ 
    return this.httpClient.get(this.SERVER_URL1); 
  }

  toggleFan(status:number){ 
    const obj = { 
      status: status 
    };
    return this.httpClient.post(this.SERVER_URL2, obj, this.httpOptions); 
  }

  // 该函数用于获取灯的状态 
  getFan(){ 
    return this.httpClient.get(this.SERVER_URL2); 
  }
}
