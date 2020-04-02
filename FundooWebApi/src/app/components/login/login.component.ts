import { Component, OnInit } from '@angular/core';
import { Validators, FormControl} from '@angular/forms';
import { Login } from 'src/app/Model/login.model';
import { UsersService } from 'src/app/Services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
login:Login=new Login();
  constructor(private usersService:UsersService,private router:Router,private matSnackBar:MatSnackBar) { }

  ngOnInit() {
  }
  email = new FormControl(null,[Validators.required,Validators.email]);
  password= new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);

  getEmailErrorMessage(){
    return this.email.hasError('required')? "Enter Email Id":
    this.email.hasError('email')? "EmailId not valid":
     "";
   }

   getPasswordErrorMessage(){
    return this.password.hasError('required')? "Enter Password":
    this.password.hasError('pattern')? "minimum 8 characters required":
     "";
   }

onSubmit()
{
this.login.email = this.email.value;
this.login.password = this.password.value;

this.usersService.usersLogin(this.login).subscribe(

  (response:any) =>{
console.log("message:"+response.message);
//added token in the local storage
localStorage.setItem('token' , response.token);
    this.matSnackBar.open(response.message, "succesfull", {duration:5000})
    this.router.navigate(["/dashboard"]);
 },
 (error:any)=> {
   this.matSnackBar.open(error.error.message, "failed to Login", {duration:5000})
  
 }
);

}

}
