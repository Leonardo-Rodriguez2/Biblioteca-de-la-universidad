import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-modal-document-viewer',
  imports: [CommonModule],
  templateUrl: './modal.document.viewer.component.html',
  styleUrl: './modal.document.viewer.component.css',
})
export class ModalDocumentViewerComponent {

  private sanitizer = inject(DomSanitizer);
  private documentService = inject(DocumentService);

  public isOpen = signal(false);
  public isLoading = signal(false);
  public hasError = signal(false);

  public docId = signal<number | null>(null);
  public docTitle = signal('');
  public docFormato = signal('');
  public pdfUrl = signal<SafeResourceUrl | null>(null);
  public viewerUrl = signal<SafeResourceUrl | null>(null);
  public docType = signal<'pdf' | 'docx' | 'google_viewer' | 'unsupported' | null>(null);

  /** Abre el modal para el documento dado */
  openViewer(docId: number, formato: string, titulo: string) {
    const fmt = (formato || '').replace(/^\./, '').trim().toUpperCase();

    this.docId.set(docId);
    this.docTitle.set(titulo);
    this.docFormato.set(fmt);
    this.isOpen.set(true);
    this.isLoading.set(true);
    this.hasError.set(false);
    this.pdfUrl.set(null);
    this.viewerUrl.set(null);

    if (fmt === 'PDF') {
      this.docType.set('pdf');
      this.documentService.previewDocument(docId).subscribe({
        next: (blob: Blob) => {
          const objectUrl = URL.createObjectURL(blob);
          this.pdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl));
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        }
      });
    } else if (fmt === 'DOCX') {
      this.docType.set('docx');
      this.documentService.downloadDocument(docId).subscribe({
        next: async (blob: Blob) => {
          try {
            // Importación dinámica para evitar fallos de compilación SSR en Node.js
            const { renderAsync } = await import('docx-preview');
            
            setTimeout(() => {
              const container = document.getElementById('docx-preview-container');
              if (container) {
                container.innerHTML = '';
                renderAsync(blob, container, undefined, {
                  className: "docx",
                  inWrapper: false,
                  ignoreWidth: true,
                  ignoreHeight: true,
                  experimental: true
                }).then(() => {
                  this.isLoading.set(false);
                }).catch(err => {
                  console.error("Error renderAsync:", err);
                  this.hasError.set(true);
                  this.isLoading.set(false);
                });
              } else {
                this.hasError.set(true);
                this.isLoading.set(false);
              }
            }, 100);
          } catch (e) {
            console.error("Error al cargar docx-preview:", e);
            this.hasError.set(true);
            this.isLoading.set(false);
          }
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        }
      });
    } else {
      // PPTX u otros formatos sin soporte nativo de preview local
      this.docType.set('unsupported');
      this.hasError.set(true);
      this.isLoading.set(false);
    }
  }

  closeViewer() {
    this.isOpen.set(false);
    // Revocar blob URL si existe para liberar memoria
    const current = this.pdfUrl();
    if (current) {
      // El valor sanitizado no podemos revocar directamente, lo limpiamos
      this.pdfUrl.set(null);
    }
  }

  download() {
    const id = this.docId();
    if (!id) return;
    this.documentService.downloadDocument(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.docTitle() || 'documento';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  openExternal() {
    const url = this.viewerUrl();
    if (url) {
      window.open(url as string, '_blank');
    }
  }

  getFormatoIcon(fmt: string): string {
    const f = (fmt || '').toUpperCase();
    if (f === 'PDF') return '📕';
    if (f === 'DOCX') return '📘';
    if (f === 'PPTX') return '📙';
    return '📄';
  }

  getFormatoColor(fmt: string): string {
    const f = (fmt || '').toUpperCase();
    if (f === 'PDF') return 'badge-pdf';
    if (f === 'DOCX') return 'badge-docx';
    if (f === 'PPTX') return 'badge-pptx';
    return 'badge-default';
  }
}
