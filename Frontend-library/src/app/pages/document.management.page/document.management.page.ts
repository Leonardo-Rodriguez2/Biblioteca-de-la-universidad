import { Component, OnInit, inject, signal } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-document.management.page',
  imports: [DatePipe],
  templateUrl: './document.management.page.html',
  styleUrl: './document.management.page.css',
})
export class DocumentManagementPage implements OnInit {

  private documentService = inject(DocumentService);
  public pendingDocuments = signal<any[]>([]);

  ngOnInit(): void {
    this.loadPendingDocuments();
  }

  loadPendingDocuments() {
    this.documentService.getDocuments({ estado: 'PENDIENTE' }).subscribe(res => {
      this.pendingDocuments.set(res.data);
    });
  }

  approve(id: number) {
    this.documentService.updateStatus(id, 'APROBADO').subscribe(() => {
      this.loadPendingDocuments();
    });
  }

  reject(id: number) {
    this.documentService.updateStatus(id, 'RECHAZADO').subscribe(() => {
      this.loadPendingDocuments();
    });
  }
}
