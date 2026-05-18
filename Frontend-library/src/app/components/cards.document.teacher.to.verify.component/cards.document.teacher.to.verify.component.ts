import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cards-document-teacher-to-verify-component',
  imports: [],
  templateUrl: './cards.document.teacher.to.verify.component.html',
  styleUrl: './cards.document.teacher.to.verify.component.css',
})
export class CardsDocumentTeacherToVerifyComponent {

  @Input() cardItemsToVerify: Array<{
    id?: number;
    titulo?: string;
    formato?: string;
    nombre_original?: string;
    title: string;
    description: string;
    amount: number;
    career: string;
    subject: string;
    date: string;
  }> = [];

  @Output() openViewer = new EventEmitter<{ id: number; formato: string; titulo: string }>();

  onOpenViewer(item: any) {
    this.openViewer.emit({
      id: item.id,
      formato: item.formato || '',
      titulo: item.titulo || item.title || ''
    });
  }
}
