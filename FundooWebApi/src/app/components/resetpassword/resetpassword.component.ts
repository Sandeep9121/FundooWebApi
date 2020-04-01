import { Component, OnInit } from '@angular/core';
import { Validators, FormControl} from '@angular/forms';
import { Resetpassword } from 'src/app/Model/resetpassword.model';
import { UsersService } from 'src/app/Services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetpassword:Resetpassword=new Resetpassword();
 constructor(private userService:UsersService,private router:Router,private route:ActivatedRoute,private matSnackBar:MatSnackBar) { }
 
  token:string;
  ngOnInit() {
    
    this.token = this.route.snapshot.paramMap.get("token");
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
    if(this.password.value===this.confirmPassword.value){
    this.resetpassword.newPassword = this.password.value;
    this.resetpassword.changepassword = this.confirmPassword.value;
    this.userService.userSetPassword(this.resetpassword ,this.token).subscribe(
      (response:any) =>{
        
        console.log("token:"+this.token);
         this.matSnackBar.open("Password reset success", "success", {duration:5000})
         this.router.navigate(["/login"]);
      },
      (error:any)=> {
        this.matSnackBar.open("Check credentials", "failed", {duration:5000})
      }

    );
   }
   else
   {
    this.matSnackBar.open("Password mismatch", "Failed", {duration:5000})
   }
   }







}
