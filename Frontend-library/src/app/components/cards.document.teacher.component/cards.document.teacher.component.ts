import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-document-teacher-component',
  imports: [],
  templateUrl: './cards.document.teacher.component.html',
  styleUrl: './cards.document.teacher.component.css',
})
export class CardsDocumentTeacherComponent {

  @Input() 
  cardItems: Array<{
    title: string;
    description: string;
    amount: number;
    subject: string;
    career: string;
  }> = [];

}
