import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {Users} from 'src/app/Model/users.model';
import {Login} from 'src/app/Model/login.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userApiUrl = environment.userApiUrl;
  private httpOptions={
    headers: new HttpHeaders ({'content-type':'application/json'})
    };
  constructor(private httpService:HttpService) { }
  usersRegister(users:Users):Observable<any>
  {
    console.log("--user-----phoneNube",users.phoneNumber);
  console.log("--user-----userMAil",users.email);
  console.log("--user-----Pass",users.password);
  return this.httpService.post(this.userApiUrl+environment.registerUrl,users,this.httpOptions);
  }


  usersLogin(login:Login)
  {
     return this.httpService.post(this.userApiUrl+environment.loginUrl,login,this.httpOptions);
  }
}
