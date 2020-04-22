import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/Services/note.service';
import { Note } from 'src/app/Model/note.model';

@Component({
  selector: 'app-displaynotes',
  templateUrl: './displaynotes.component.html',
  styleUrls: ['./displaynotes.component.scss']
})
export class DisplaynotesComponent implements OnInit {
  trashedNotes: boolean = false;
  archiveNotes: boolean = false;
  pinnedNotes: boolean = false;

  others=new Array<Note>();
  notes = new Array<Note>();
  pinned = new Array<Note>();
  searchNotes: any;
  view:any;

  constructor(    private route: Router,
    private matSnackBar: MatSnackBar,
    private noteService:NoteService , private router:ActivatedRoute) { }

   private param:any;

  ngOnInit() {
    this.noteService.autoRefresh.subscribe(() => {
      this.getOtherNotes();
      this.getPinnedNotes();
    });

    this.router.queryParams.subscribe(params=>{this.param=params['note'];
    if (this.param == "archive") 
    {
      this.getArchivedNotes();
    }
    else if(this.param == "trash")
    {
      this.getTrashedNotes();
    }
    else
    {
     this.getOtherNotes();
     this.getPinnedNotes();
     this.getView();
     
    }
    
  
    });

    this.getSearchNotes();
  }

  getOtherNotes(){

    this.trashedNotes = false;
    this.archiveNotes = false;

    this.noteService.getAllNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        console.log("notes:",response.object);
        this.others = response['obj'];
         this.others.filter(note=>note.pinned===false&&note.archieved===false&&note.trashed==false).map(note=>this.notes.push(note));
      },  
      (error:any)=> {
        this.matSnackBar.open(error.error.message, "failed", {duration:5000})
      }
    );
  }


  getArchivedNotes(){

    this.archiveNotes = true;
    this.trashedNotes = false;
    
    this.noteService.getArchieveNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        this.notes = response['obj'];
          
      }
    );
  }


  getTrashedNotes(){
    this.trashedNotes = true;
   
    this.noteService.getTrashedNotes().subscribe(

      (response: any) => {
        console.log("response", response);
      
        this.notes = response['obj'];
          
      }
    )
  }

  getPinnedNotes(){

    this.pinnedNotes = true;
    this.trashedNotes = false;
    this.archiveNotes = false;

this.noteService.getPinnedNotes().subscribe(
  (response: any) => {
    console.log("response", response);
    console.log("notes:",response.obj);
    this.pinned = response['obj'];
  }
  // (error:any)=> {
  //   this.matSnackBar.open(error.error.message, "failed", {duration:5000})
  // }
);
  }


  getSearchNotes(){
    this.noteService.getSearchNotes().subscribe(
      (message: any) => {
console.log("searchtitle",message.notes);
        this.searchNotes = message.notes;
       
      }
    );
  }


  getView(){
    this.noteService.getView().subscribe(
      (response:any)=>{
               this.view=response.view;
           }
    );
    
  }


  reminderNotes()
  {
    this.noteService.getAllNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        console.log("notes:",response.obj);
        this.others = response['obj'];
         this.others.filter(note=>note.reminder != null).map(note=>this.notes.push(note));
      },  
      (error:any)=> {
        this.matSnackBar.open(error.error.message, "failed", {duration:5000})
      }
    );
  }

}
