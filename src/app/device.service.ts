import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  SERVER_URL1 = 'http://192.168.43.177:8000/device1'; 
  SERVER_URL2 = 'http://192.168.43.177:8000/device2'; 
  SERVER_URL3 = 'http://192.168.43.177:8080/device3'; 
  SERVER_URL4 = 'http://192.168.43.177:8080/device4'; 
  SERVER_URL5 = 'http://192.168.43.177:8000/device5'; 
  SERVER_URL6 = 'http://192.168.43.177:8000/device6'; 
  SERVER_URL7 = 'http://192.168.43.177:8000/device7'; 
  SERVER_URL8 = 'http://192.168.43.177:8080/device8'; 
  SERVER_URL9 = 'http://192.168.43.177:8000/device9'; 
  SERVER_URL10 = 'http://192.168.43.177:8080/device10'; 
  httpOptions = { 
    headers: 
    new HttpHeaders({ 
      'Content-Type': 'application/json' 
    }) 
  }; 
  constructor(private httpClient: HttpClient) { 
    
  }

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

  // 该函数用于获取风扇的状态 
  getFan(){ 
    return this.httpClient.get(this.SERVER_URL2); 
  }

  toggleLed(status:number){ 
    const obj = { 
      status: status 
    };
    return this.httpClient.post(this.SERVER_URL3, obj, this.httpOptions); 
  }

  // 该函数用于获取灯的状态 
  getLed(){ 
    return this.httpClient.get(this.SERVER_URL3); 
  }

  toggleWebcam(status:number){ 
    const obj = { 
      status: status 
    };
    return this.httpClient.post(this.SERVER_URL4, obj, this.httpOptions); 
  }
  // 该函数用于获取灯的状态 
  getWebcam(){ 
      return this.httpClient.get(this.SERVER_URL4); 
  }

  toggleLock(status:number){ 
    const obj = { 
      status: status 
    };
    return this.httpClient.post(this.SERVER_URL5, obj, this.httpOptions); 
  }
  // 该函数用于获取灯的状态 
  getLock(){ 
    return this.httpClient.get(this.SERVER_URL5); 
  }

  toggleDoor(status:number){ 
    const obj = { 
      status: status 
    };
    return this.httpClient.post(this.SERVER_URL6, obj, this.httpOptions); 
  }
  // 该函数用于获取灯的状态 
  getDoor(){ 
    return this.httpClient.get(this.SERVER_URL6); 
  }

  toggleHumidifier(status:number){ 
    const obj = { 
      status: status 
    };
    return this.httpClient.post(this.SERVER_URL7, obj, this.httpOptions); 
  }
  // 该函数用于获取灯的状态 
  getHumidifier(){ 
    return this.httpClient.get(this.SERVER_URL7); 
  }
 
  toggleAlarm(status:number){ 
    const obj = { 
      status: status 
    };
    return this.httpClient.post(this.SERVER_URL8, obj, this.httpOptions); 
  }

  getAlarm(){ 
    return this.httpClient.get(this.SERVER_URL8); 
  }

  toggleFire(status:number){ 
    const obj = { 
      status: status 
    };
    return this.httpClient.post(this.SERVER_URL9, obj, this.httpOptions); 
  }
  // 该函数用于获取灯的状态 
  getFire(){ 
    return this.httpClient.get(this.SERVER_URL9); 
  }

  toggleWater(status:number){ 
    const obj = { 
      status: status 
    };
    return this.httpClient.post(this.SERVER_URL10, obj, this.httpOptions); 
  }
  // 该函数用于获取灯的状态 
  getWater(){ 
    return this.httpClient.get(this.SERVER_URL10); 
  }
}
