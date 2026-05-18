import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { ServiceCategory } from '../../services/service.category/service.category';
import { ServiceSubject } from '../../services/sevice.subject/service.subject';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalDocumentViewerComponent } from '../../components/modal.document.viewer.component/modal.document.viewer.component';

@Component({
  selector: 'app-library.page',
  imports: [FormsModule, DatePipe, ModalDocumentViewerComponent],
  templateUrl: './library.page.html',
  styleUrl: './library.page.css',
})
export class LibraryPage implements OnInit {

  private documentService = inject(DocumentService);
  private categoryService = inject(ServiceCategory);
  private subjectService = inject(ServiceSubject);
  private platformId = inject(PLATFORM_ID);

  public documents = signal<any[]>([]);
  public categories: any[] = [];
  public subjects: any[] = [];
  
  public filters = {
    search: '',
    categoria: '',
    asignatura: '',
    tipo: ''
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadDocuments();
      this.loadFilterData();
    }
  }

  loadDocuments() {
    this.documentService.getDocuments({ ...this.filters, estado: 'APROBADO' }).subscribe(res => {
      this.documents.set(res.data);
    });
  }

  loadFilterData() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res.data;
    });
    this.subjectService.getAllSubject().subscribe(res => {
      this.subjects = res.data;
    });
  }

  applyFilters() {
    this.loadDocuments();
  }

  download(docId: number, fileName: string) {
    this.documentService.downloadDocument(docId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }
}
