import { NgClass } from '@angular/common';
import { Component, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-modal-to-add-document-component',
  imports: [FormsModule, NgClass],
  templateUrl: './modal.to.add.document.component.html',
  styleUrl: './modal.to.add.document.component.css',
})
export class ModalToAddDocumentComponent {



   public modalStep = 1;
  public formModel = {
    title: '',
    description: '',
    career: '',
    subject: '',
    date: '',
    teacher: ''
  };
  public selectedFile: File | null = null;
  public isUploading = false;
  public uploadProgress = 0;
  public pendingUploads: any[] = [];

  openModal() {
    this.modalStep = 1;
    this.formModel = { title: '', description: '', career: '', subject: '', date: '', teacher: '' };
    this.selectedFile = null;
    this.isUploading = false;
    this.uploadProgress = 0;
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
    if (file) this.selectedFile = file;
  }

  startUpload() {
    if (!this.selectedFile) return;
    // go to verifying step and simulate a 5s verification/loading
    this.modalStep = 3;
    this.isUploading = true;
    this.uploadProgress = 0;
    const totalMs = 5000;
    const interval = 100;
    const steps = totalMs/interval;
    const increment = 100/steps;
    const id = setInterval(() => {
      this.uploadProgress = Math.min(100, this.uploadProgress + increment);
    }, interval);

    setTimeout(() => {
      clearInterval(id);
      this.isUploading = false;
      this.uploadProgress = 100;
      const data = { ...this.formModel, fileName: this.selectedFile!.name, status: 'pending', createdAt: new Date() };
      this.pendingUploads.push(data);
      this.modalStep = 4;
    }, totalMs);
  }

  confirmDone() {
    // Close modal but keep pendingUploads until DB finishes processing
    this.closeModal();
  }

  


}
