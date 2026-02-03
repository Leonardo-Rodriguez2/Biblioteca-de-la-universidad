import { Component } from '@angular/core';
import { PaginatedComponent } from '../../components/paginated.component/paginated.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CardsDocumentTeacherComponent } from '../../components/cards.document.teacher.component/cards.document.teacher.component';
import { CardsDocumentTeacherToVerifyComponent } from '../../components/cards.document.teacher.to.verify.component/cards.document.teacher.to.verify.component';
import { SearchFiltersComponents } from '../../components/search.filters.components/search.filters.components';
import { NgClass } from '@angular/common';
import { ModalToAddDocumentComponent } from '../../components/modal.to.add.document.component/modal.to.add.document.component';

@Component({
  selector: 'app-my.library.page',
  imports: [PaginatedComponent, FormsModule, 
  CardsDocumentTeacherComponent, CardsDocumentTeacherToVerifyComponent,
  SearchFiltersComponents, ModalToAddDocumentComponent, NgClass
],
  templateUrl: './my.library.page.html',
  styleUrl: './my.library.page.css',
})
export class MyLibraryPage { 



  // agregando comentarios

  // @Output() Modal: EventEmitter<any> = new EventEmitter<any>();

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












  // Tarjetas de documentos de los docentes

    public cardItems = [
    { title: 'Informe de Prácticas', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore', 
      amount: 7,
      career: 'Ingeniería en Sistemas',
      subject: 'Matemática',
      date: '12/05/2023'  
    },

    { title: 'Proyecto Final', 
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
      amount: 5,
      career: 'Ingeniería Industrial',
      subject: 'Física',
      date: '20/06/2023'  
    },
  
    { title: 'Análisis de Algoritmos', 
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 
      amount: 10,
      career: 'Ingeniería en Sistemas',
      subject: 'Programación',
      date: '15/07/2023'  
    }, 
        { title: 'Informe de Prácticas', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore', 
      amount: 7,
      career: 'Ingeniería en Sistemas',
      subject: 'Matemática',
      date: '12/05/2023'  
    },
  
    { title: 'Proyecto Final', 
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
      amount: 5,
      career: 'Ingeniería Industrial',
      subject: 'Física',
      date: '20/06/2023'  
    },
  
    { title: 'Análisis de Algoritmos', 
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 
      amount: 10,
      career: 'Ingeniería en Sistemas',
      subject: 'Programación',
      date: '15/07/2023'  
    }
  ];

  // Tarjetas de documentos de los docentes por verificar

  public cardItemsToVerify = [
    { title: 'Informe de Prácticas', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore', 
      amount: 7,
      career: 'Ingeniería en Sistemas',
      subject: 'Matemática',
      date: '12/05/2023'  
    },
  
    { title: 'Proyecto Final', 
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
      amount: 5,
      career: 'Ingeniería Industrial',
      subject: 'Física',
      date: '20/06/2023'  
    },

    { title: 'Análisis de Algoritmos', 
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 
      amount: 10,
      career: 'Ingeniería en Sistemas',
      subject: 'Programación',
      date: '15/07/2023'  
    }
  ];

  // Criterios de filtro de búsqueda

  public filterCriteria = [
    {
      career: 'Ingeniería en Sistemas',
      subject: 'Matemática',
      age: 1,
      date: '12/05/2023',
      teacher: 'Eber Roa'
    },
    {
      career: 'Ingeniería Industrial',
      subject: 'Física',
      age: 2,
      date: '20/06/2023',
      teacher: 'Ana Gomez'
    },
    {
      career: 'Ingeniería en Sistemas',
      subject: 'Programación I',
      age: 1,
      date: '15/07/2023',
      teacher: 'Luis Perez'
    },
    {
      career: 'Ingeniería en Sistemas',
      subject: 'Programación II',
      age: 2,
      date: '12/05/2023',
      teacher: 'Alfredo Nogera'
    }
  ]

}
