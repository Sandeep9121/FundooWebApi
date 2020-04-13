import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../Model/note.model';

@Pipe({
  name: 'note'
})
export class NotePipe implements PipeTransform {

  transform(notes:Note[],searchTerm:String):Note[] {
    if(!notes || !searchTerm){
      return notes;
    } 
    console.log('notes',notes,'title',searchTerm);
    return notes.filter(note=>note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.description.toLowerCase().includes(searchTerm.toLowerCase())) ;
  }

}
