import { Component, OnInit, Inject } from '@angular/core';
import { Users } from 'src/app/Model/users.model';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/Services/note.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  ownerName:String="Sandeep";
  ownerEmail:String ="sandeep.rayala14@gmail.com";
  notesId:number;
  collaborators:Users[];

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private noteService:NoteService,private userService:UsersService,
  private matSnackBar: MatSnackBar) {

    this.notesId = data.notesId;
   }

  ngOnInit() {

    this.ownerEmail = localStorage.getItem('email');
    this.getCollaborators();
  }

  addCollaborator(email)
  {
    console.log("email to add:",email);
    this.userService.addCollaborator(this.notesId , email).subscribe(
      (response:any)=>{
        this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
      },
      (error:any)=> {
          this.matSnackBar.open(error.error.message, "failed", {duration:5000});
        }
    )
  }

  removeCollaborator(email)
  {
    console.log("email to remove:",email);
  this.userService.deleteCollaborator(this.notesId , email).subscribe(
    (response:any)=>{
      this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
    },
    (error:any)=> {
        this.matSnackBar.open(error.error.message, "failed", {duration:5000});
      }
  );
    }

  getCollaborators()
  {
   this.userService.getCollaborators(this.notesId).subscribe(
    (response:any)=>{
      // this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
      this.collaborators = response['obj'];
      console.log("collaborators list:",this.collaborators);
    },
    (error:any)=> {
        this.matSnackBar.open(error.error.message, "failed", {duration:5000});
      }
   ) 
  }
}
