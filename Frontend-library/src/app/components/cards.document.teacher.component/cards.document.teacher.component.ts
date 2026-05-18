import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cards-document-teacher-component',
  imports: [],
  templateUrl: './cards.document.teacher.component.html',
  styleUrl: './cards.document.teacher.component.css',
})
export class CardsDocumentTeacherComponent {

  @Input() 
  cardItems: Array<{
    id?: number;
    titulo?: string;
    formato?: string;
    nombre_original?: string;
    title: string;
    description: string;
    amount: number;
    subject: string;
    career: string;
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
