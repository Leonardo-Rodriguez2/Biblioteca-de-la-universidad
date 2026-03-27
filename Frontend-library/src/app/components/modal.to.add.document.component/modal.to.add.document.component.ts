import { NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { ServiceCategory } from '../../services/service.category/service.category';
import { ServiceSubject } from '../../services/sevice.subject/service.subject';

@Component({
  selector: 'app-modal-to-add-document-component',
  imports: [FormsModule, NgClass],
  templateUrl: './modal.to.add.document.component.html',
  styleUrl: './modal.to.add.document.component.css',
})
export class ModalToAddDocumentComponent implements OnInit {

  @Output() onUploadSuccess = new EventEmitter<void>();

  private documentService = inject(DocumentService);
  private categoryService = inject(ServiceCategory);
  private subjectService = inject(ServiceSubject);

  public modalStep = 1;
  public formModel = {
    title: '',
    description: '',
    type: 'GUIA' as any,
    category_id: null,
    subject_id: null,
    tutor_id: null
  };
  
  public categories: any[] = [];
  public subjects: any[] = [];
  public documentTypes = ['TESIS', 'GUIA', 'LIBRO', 'PROYECTO', 'EXAMEN', 'OTRO'];

  public selectedFile: File | null = null;
  public fileName: string = '';
  public isUploading = false;
  public uploadProgress = 0;
  public errorMessage: string = '';

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res.data;
    });
    this.subjectService.getAllSubject().subscribe(res => {
      this.subjects = res.data;
    });
  }

  openModal() {
    this.modalStep = 1;
    this.formModel = { title: '', description: '', type: 'GUIA', category_id: null, subject_id: null, tutor_id: null };
    this.selectedFile = null;
    this.fileName = '';
    this.isUploading = false;
    this.uploadProgress = 0;
    this.errorMessage = '';
    const d = document.getElementById('my_modal_4') as any;
    if (d && d.showModal) d.showModal();
  }

  closeModal() {
    const d = document.getElementById('my_modal_4') as any;
    if (d && d.close) d.close();
  }

  nextStep() {
    if (this.modalStep < 4) this.modalStep++;
  }

  prevStep() {
    if (this.modalStep > 1) this.modalStep--;
  }

  onFileSelected(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  startUpload() {
    if (!this.selectedFile || !this.formModel.title || !this.formModel.category_id || !this.formModel.subject_id) return;

    this.modalStep = 3;
    this.isUploading = true;
    this.uploadProgress = 30; // Inicio visual
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('archivo', this.selectedFile);
    formData.append('titulo', this.formModel.title);
    formData.append('resumen', this.formModel.description);
    formData.append('tipo', this.formModel.type);
    
    if (this.formModel.category_id !== null) {
        formData.append('categoria_id', (this.formModel.category_id as number).toString());
    }
    
    if (this.formModel.subject_id !== null) {
        formData.append('asignatura_id', (this.formModel.subject_id as number).toString());
    }
    
    if (this.formModel.tutor_id !== null) {
        formData.append('tutor_id', (this.formModel.tutor_id as number).toString());
    }

    this.documentService.uploadDocument(formData).subscribe({
      next: (res) => {
        this.isUploading = false;
        this.uploadProgress = 100;
        this.modalStep = 4;
      },
      error: (err) => {
        this.isUploading = false;
        this.errorMessage = err.error?.message || 'Error al subir el documento';
        this.modalStep = 2; // Regresar para intentar de nuevo
      }
    });
  }

  confirmDone() {
    this.closeModal();
    this.onUploadSuccess.emit();
  }
}
