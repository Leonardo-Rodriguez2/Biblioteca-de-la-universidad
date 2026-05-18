import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { ModalDocumentViewerComponent } from '../../components/modal.document.viewer.component/modal.document.viewer.component';

@Component({
  selector: 'app-document.management.page',
  imports: [DatePipe, ModalDocumentViewerComponent],
  templateUrl: './document.management.page.html',
  styleUrl: './document.management.page.css',
})
export class DocumentManagementPage implements OnInit {

  private documentService = inject(DocumentService);
  private platformId = inject(PLATFORM_ID);
  public pendingDocuments = signal<any[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPendingDocuments();
    }
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
