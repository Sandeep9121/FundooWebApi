import { Component, OnInit } from '@angular/core';
import { Validators, FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Users } from 'src/app/Model/users.model';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user:Users = new Users();

  constructor(private usersService:UsersService,private router:Router,private matSnackBar:MatSnackBar) { }

  ngOnInit() {
  }
  name=new FormControl(null,[Validators.required , Validators.pattern('[a-zA-Z]{3,20}')]);
  email = new FormControl(null,[Validators.required,Validators.email]);
  password= new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);
  phoneNumber=new FormControl(null,[Validators.required,Validators.pattern('^[1-9]{1}[0-9]{9}$')]);

  getNameErrorMessage(){
    return this.name.hasError('required')? "Enter name":
    this.name.hasError('pattern')?"Name required minimum 3 character":
     "";
   }

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

   getPhoneNoErrorMessage(){
    return this.phoneNumber.hasError('required')? "Enter PhoneNo":
    this.phoneNumber.hasError('pattern')? "PhoneNo not valid":
     "";
   }
   onSubmit(){
     this.user.name = this.name.value;
     this.user.email = this.email.value;
     this.user.password = this.password.value;
     this.user.phoneNumber = this.phoneNumber.value;
     this.usersService.usersRegister(this.user).subscribe(
      (response:any) =>{
        this.matSnackBar.open(response.message+" check mail to verify", "succesfull", {duration:5000})
        this.router.navigate(["/login"]);
     },
     (error:any)=> {
       this.matSnackBar.open(error.error.message, "failed", {duration:5000})
     }
     );
   }



}
