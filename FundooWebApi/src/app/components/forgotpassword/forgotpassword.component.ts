import { Component, OnInit } from '@angular/core';
import { Forgotpassword } from 'src/app/Model/forgotpassword.model';
import { UsersService } from 'src/app/Services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
   forgotpassword:Forgotpassword =new Forgotpassword(); 

   constructor(private userService:UsersService,private matSnackBar:MatSnackBar) { }
 
 
 
   ngOnInit() {
   }
 
   email = new FormControl(null,[Validators.required,Validators.email]);
  
   getEmailErrorMessage(){
     return this.email.hasError('required')? "Enter Email Id":
     this.email.hasError('email')? "EmailId not valid":
      "";

    }
    
       
    onSubmit(){
 
     this.forgotpassword.email = this.email.value;
     console.log("-------------------mail",this.email.value);
      this.userService.userForgotPassword(this.forgotpassword).subscribe(
 
       (response:any) => {
         console.log(response.message);
         this.matSnackBar.open("Check mail to verify", "succesfull", {duration:5000})
      },
 
      (error:any)=> {
        this.matSnackBar.open("not found user", "failed" , {duration:5000})
      }
      );
    }

}
