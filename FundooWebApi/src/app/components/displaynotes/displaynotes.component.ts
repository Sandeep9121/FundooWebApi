import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/Services/note.service';
import { Note } from 'src/app/Model/note.model';

@Component({
  selector: 'app-displaynotes',
  templateUrl: './displaynotes.component.html',
  styleUrls: ['./displaynotes.component.scss']
})
export class DisplaynotesComponent implements OnInit {
  constructor(    private router: Router,
    private matSnackBar: MatSnackBar,
    private noteService:NoteService) { }
    

  token:String;
  notes: Note[];

  ngOnInit() {
    this.noteService.autoRefresh.subscribe(() => {
      this.getAllNotes();
    });
    this.getAllNotes();
  }

  getAllNotes(){
    this.noteService.getAllNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        console.log("notes:",response.obj);
        this.notes = response['obj'];
      },  
      (error:any)=> {
        this.matSnackBar.open(error.error.message, "failed", {duration:5000})
      }
    );
  }

}
