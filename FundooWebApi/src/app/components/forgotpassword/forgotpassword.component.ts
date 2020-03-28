import { Component, OnInit } from '@angular/core';
import { Forgotpassword } from 'src/app/Model/forgotpassword.model';
import { UsersService } from 'src/app/Services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
   forgotpassword:Forgotpassword =new Forgotpassword();
  constructor(private usersService:UsersService,private router:Router,private matSnackBar:MatSnackBar) { }

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
     this.usersService.userForgotPassword(this.forgotpassword).subscribe(

      (response:any) => {
        console.log(response.message);
        this.matSnackBar.open("Check mail to verify", "succesfull", {duration:5000})
        this.router.navigate(["/login"]);
     },

     (error:any)=> {
       this.matSnackBar.open("Invalid mail", "failed", {duration:5000})
     }
     );
   }

}
