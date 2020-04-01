import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
 import { ActivatedRoute,Router } from '@angular/router';
 import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {
  constructor(private usersService:UsersService,private router:Router,private route:ActivatedRoute,private matSnackBar:MatSnackBar) { }
  token:String;
  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token");
  }
  onSubmit()
  {
    this.usersService.userVerification(this.token).subscribe(
      (response:any) =>{
        
        console.log("token:"+this.token);
        console.log("message:"+response.message);
         this.matSnackBar.open(response.message, "success", {duration:5000})
         this.router.navigate([""]);
      },
      (error:any)=> {
        this.matSnackBar.open("verification failed", "failed", {duration:5000})
      }
    );
  }

}
