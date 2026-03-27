import { Component, Inject, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PaginatedComponent } from '../../components/paginated.component/paginated.component';
import { FormsModule } from '@angular/forms';
import { CardsDocumentTeacherComponent } from '../../components/cards.document.teacher.component/cards.document.teacher.component';
import { CardsDocumentTeacherToVerifyComponent } from '../../components/cards.document.teacher.to.verify.component/cards.document.teacher.to.verify.component';
import { ModalToAddDocumentComponent } from '../../components/modal.to.add.document.component/modal.to.add.document.component';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-my.library.page',
  imports: [PaginatedComponent, FormsModule,
    CardsDocumentTeacherComponent, CardsDocumentTeacherToVerifyComponent,
    ModalToAddDocumentComponent
  ],
  templateUrl: './my.library.page.html',
  styleUrl: './my.library.page.css',
})
export class MyLibraryPage implements OnInit {

  private documentService = inject(DocumentService);
  private platformId = inject(PLATFORM_ID);

  public cardItems = signal<any[]>([]);
  public cardItemsToVerify = signal<any[]>([]);
  public userId: number | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        this.userId = user.id;
        this.loadDocuments();
      }
    }
  }

  loadDocuments() {
    if (!this.userId) return;

    this.documentService.getDocuments({ autor: this.userId }).subscribe(res => {
      const allDocs = res.data.map((d: any) => ({
        ...d,
        title: d.titulo,
        description: d.resumen,
        subject: d.asignatura_nombre,
        career: d.categoria_nombre,
        amount: d.peso_mb,
        date: d.fecha_subida
      }));

      this.cardItems.set(allDocs.filter((d: any) => d.estado_aprobacion === 'APROBADO' || d.estado_aprobacion === 'PUBLICADO'));
      this.cardItemsToVerify.set(allDocs.filter((d: any) => d.estado_aprobacion === 'PENDIENTE' || d.estado_aprobacion === 'REVISION' || d.estado_aprobacion === 'RECHAZADO'));
    });
  }

  public filterCriteria = [
    { career: 'Ingeniería en Sistemas', subject: 'Matemática', age: 1, date: '12/05/2023', teacher: 'Eber Roa' }
  ];
}
