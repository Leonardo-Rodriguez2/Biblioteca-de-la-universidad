import { Component, inject, OnInit, ViewChild, ElementRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WarehousesService } from '../../services/warehouses.service/warehouses.service';

@Component({
  selector: 'app-warehouses.management.page',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './warehouses.management.page.html',
  styleUrl: './warehouses.management.page.css',
})
export class WarehousesManagementPage implements OnInit {
  @ViewChild('warehouseModal') modalRef!: ElementRef<HTMLDialogElement>;
  private warehouseService = inject(WarehousesService);
  private platformId = inject(PLATFORM_ID);

  warehouses: any[] = [];
  modalStep = 1;
  isEdit = false;

  formModel: any = {
    name: '',
    code: '',
    location: '',
    description: '',
    responsible: ''
  };

  filterValue = {
    code: '',
    location: '',
    responsible: ''
  };

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllWarehouses();
    }
  }

  getAllWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe({
      next: (res: any) => {
        this.warehouses = res.data || res;
        console.log("Almacenes cargados:", this.warehouses);
      },
      error: (err) => console.error("Error al cargar lista:", err)
    });
  }

  openModal(warehouse: any = null) {
    if (warehouse) {
      this.isEdit = true;
      
      // Mantenemos los valores de formModel pero mapeamos lo que viene de la fila
      // Esto asegura que si la DB trae 'nombre', se vea en el input 'name'
      this.formModel = { 
        ...warehouse, 
        name: warehouse.nombre || warehouse.name,
        code: warehouse.codigo_area || warehouse.codigo || warehouse.code,
        location: warehouse.ubicacion || warehouse.location,
        responsible: warehouse.responsable_almacen || warehouse.responsible,
        description: warehouse.descripcion || warehouse.description
      };
      
      console.log("Editando almacén con ID:", this.formModel.id);
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
      name: '', code: '', location: '', responsible: '', description: '' 
    };
  }

  saveWarehouse() {
    if (this.isEdit) {
      if (!this.formModel.id) return;
      this.warehouseService.updateWarehouse(this.formModel.id, this.formModel).subscribe({
        next: (res) => {
          this.getAllWarehouses();
          this.closeModal();
          // location.reload(); // Solo si lo requieres
        },
        error: (err) => console.error("Error al actualizar:", err)
      });
    } else {
      this.warehouseService.addWarehouse(this.formModel).subscribe({
        next: (res) => {
          this.getAllWarehouses();
          this.closeModal();
        },
        error: (err) => console.error("Error al registrar:", err)
      });
    }
  }
}