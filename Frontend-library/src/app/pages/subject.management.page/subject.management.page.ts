import { Component, ElementRef, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceSubject } from '../../services/sevice.subject/service.subject';

@Component({
  selector: 'app-subject.management.page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './subject.management.page.html',
  styleUrl: './subject.management.page.css',
})
export class SubjectManagementPage implements OnInit {
  @ViewChild('userModal') modalRef!: ElementRef<HTMLDialogElement>;
  private subjectService = inject(ServiceSubject);
  private platformId = inject(PLATFORM_ID);
  
  subject: any[] = [];
  modalStep = 1;
  isEdit = false;

  formModel: any = {
    id: "",
    career_id: "1",
    name: "",
    semester: ""
  };

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllSubject();
    }
  }

  getAllSubject() {
    this.subjectService.getAllSubject().subscribe({
      next: (res: any) => {
        this.subject = res.data || [];
      },
      error: (err) => console.error(err)
    });
  }

  openModal(item: any = null) {
    if (item) {
      this.isEdit = true;
      this.formModel = { 
        id: item.id,
        career_id: item.carrera_id,
        name: item.nombre,
        semester: item.semestre
      };
    } else {
      this.isEdit = false;
      this.resetForm();
    }
    this.modalStep = 1;
    if (this.modalRef?.nativeElement) {
      this.modalRef.nativeElement.showModal();
    }
  }

  closeModal() {
    if (this.modalRef?.nativeElement) {
      this.modalRef.nativeElement.close();
    }
  }

  nextStep() { this.modalStep++; }
  prevStep() { this.modalStep--; }

  resetForm() {
    this.formModel = { 
      id: "",
      career_id: "1",
      name: "",
      semester: ""
    };
  }

  saveUser() {
    if (this.isEdit) {
      if (!this.formModel.id) return;

      this.subjectService.updateSubject(this.formModel.id, this.formModel).subscribe({
        next: () => {
          this.getAllSubject();
          this.closeModal();
        },
        error: (err) => console.error(err)
      });

    } else {
      this.subjectService.addSubject(this.formModel).subscribe({
        next: () => {
          this.getAllSubject();
          this.closeModal();
        },
        error: (err) => console.error(err)
      });
    }
  }

    deleteSubject(id: number) {
    this.subjectService.deleteSubject(id).subscribe({
      next: (res: any) => {
        alert("Se elimino");
      },
      error: (err) => console.error(err)
    });
  }

}