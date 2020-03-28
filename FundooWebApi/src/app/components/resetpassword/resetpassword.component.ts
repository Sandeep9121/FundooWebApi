import { Component, OnInit } from '@angular/core';
import { Validators, FormControl} from '@angular/forms';
import { Resetpassword } from 'src/app/Model/resetpassword.model';
import { UsersService } from 'src/app/Services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetpassword:Resetpassword=new Resetpassword();

  constructor(private usersService:UsersService, private router:Router,private matSnakBar:MatSnackBar) { 

  }

  ngOnInit() {
  }


  password= new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);
  confirmPassword= new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);


   getPasswordErrorMessage(){
    return this.password.hasError('required')? "Enter Password":
    this.password.hasError('pattern')? "minimum 8 characters required":
     "";
   }

   getConfirmPasswordErrorMessage(){
    return this.confirmPassword.hasError('required')? "Enter Password":
    this.confirmPassword.hasError('pattern')? "minimum 8 characters required":
     "";
   }

   onSubmit()
   {


    this.resetpassword.password = this.password.value;
    this.resetpassword.confirmPassword = this.confirmPassword.value;
    this.usersService.userSetPassword(this.resetpassword).subscribe(
      (response:any) =>{
        
         this.matSnakBar.open("Password reset", "success", {duration:5000})
         this.router.navigate(["/login"]);
      },
      error=> {
        this.matSnakBar.open("Check credentials", "failed to reset", {duration:5000})
      }

    );
   } 
 








}
