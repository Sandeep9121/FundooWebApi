import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/Model/note.model';

@Component({
  selector: 'app-singlenote',
  templateUrl: './singlenote.component.html',
  styleUrls: ['./singlenote.component.scss']
})
export class SinglenoteComponent implements OnInit {
    @Input() note: Note;

  constructor() { }

  ngOnInit() {
  }

}
