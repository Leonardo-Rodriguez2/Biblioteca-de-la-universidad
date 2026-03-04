import { Component, inject, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PnfService } from '../../services/pnf.service/pnf.service';

@Component({
  selector: 'app-pnf.management.page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pnf.management.page.html',
  styleUrl: './pnf.management.page.css',
})
export class PnfManagementPage implements OnInit {
  @ViewChild('pnfModal') modalRef!: ElementRef<HTMLDialogElement>;
  private pnfService = inject(PnfService);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  pnfs: any[] = [];
  modalStep = 1;
  isEdit = false;

  // Modelo del formulario para Carreras (PNF)
  formModel: any = {
    nombre: '',
    codigo: '',
    descripcion: ''
  };

  ngOnInit() {
    this.getAllPnfs();
  }

  getAllPnfs() {
    this.pnfService.getAllPnf().subscribe({
      next: (res: any) => {
        this.ngZone.run(() => {
          // Asumiendo que la respuesta tiene una estructura similar con .data
          this.pnfs = res.data || res; 
          this.cdr.markForCheck();
        });
        console.log("Carreras cargadas:", this.pnfs);
      },
      error: (err) => console.error("Error al cargar PNF:", err)
    });
  }

  openModal(pnf: any = null) {
    if (pnf) {
      this.isEdit = true;
      this.formModel = { ...pnf };
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
    this.modalRef.nativeElement.close();
  }

  nextStep() { this.modalStep++; }
  prevStep() { this.modalStep--; }

  resetForm() {
    this.formModel = { 
      nombre: '', codigo: '', descripcion: '' 
    };
  }

  savePnf() {
    if (this.isEdit) {
      this.pnfService.updatePnf(this.formModel.id, this.formModel).subscribe({
        next: () => {
          this.getAllPnfs();
          this.closeModal();
          // location.reload(); // Opcional, mejor solo refrescar la lista
        },
        error: (err) => console.error("Error al actualizar:", err)
      });
    } else {
      this.pnfService.addPnf(this.formModel).subscribe({
        next: () => {
          this.getAllPnfs();
          this.closeModal();
        },
        error: (err) => console.error("Error al registrar:", err)
      });
    }
  }
}