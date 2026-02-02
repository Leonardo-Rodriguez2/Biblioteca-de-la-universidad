import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-document-teacher-to-verify-component',
  imports: [],
  templateUrl: './cards.document.teacher.to.verify.component.html',
  styleUrl: './cards.document.teacher.to.verify.component.css',
})
export class CardsDocumentTeacherToVerifyComponent {

  @Input() cardItemsToVerify: Array<{
    title: string;
    description: string;
    amount: number;
    career: string;
    subject: string;
    date: string;
  }> = [];

}
