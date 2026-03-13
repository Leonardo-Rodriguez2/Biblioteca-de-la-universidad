import { ChangeDetectorRef, Component, ElementRef, inject, NgZone, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ServiceCategory } from '../../services/service.category/service.category';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-categoty.management.page',
  standalone: true,
  imports: [FormsModule, NgClass, CommonModule],
  templateUrl: './categoty.management.page.html',
  styleUrl: './categoty.management.page.css',
})

export class CategotyManagementPage implements OnInit {

  @ViewChild('userModal') modalRef!: ElementRef<HTMLDialogElement>;
  private categoryService = inject(ServiceCategory);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  categories: any[] = [];
  modalStep = 1;
  isEdit = false;

  // Modelo del formulario
  formModel: any = {
    id: null,
    nombre: '',
    descripcion: '',
  };

ngOnInit() {
    this.getAllCategories();
  }

getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        this.ngZone.run(() => {
          this.categories = res.data || [];
          this.cdr.markForCheck();
        });
      },
      error: (err: any) => console.error("Error al recargar lista:", err)
    });
  }

  openModal(user: any = null) {
    if (user) {
      this.isEdit = true;
      // Clonamos el objeto para no modificar la tabla directamente antes de guardar
      this.formModel = { ...user };
      console.log("Editando usuario con ID:", this.formModel.id);
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
      id: null,
      nombre: '',
      descripcion: '',
    };
  }

  
  saveCategory() {
    console.log("Intentando guardar...", this.formModel);

    if (this.isEdit) {
      if (!this.formModel.id) {
        console.error("Error: No se puede actualizar una categoría sin ID");
        return;
      }

      const body = {
        name: this.formModel.nombre,
        description: this.formModel.descripcion,
      };

      this.categoryService.updateCategory(this.formModel.id, body).subscribe({
        next: (res: any) => {
          console.log("Actualización exitosa:", res);
          this.getAllCategories(); // Refrescar tabla
          this.closeModal();  // Cerrar modal
          location.reload()
        },
        error: (err: any) => console.error("Error al actualizar:", err)
      });

    } else {
      console.log(this.formModel)
      const body = {
        name: this.formModel.nombre,
        description: this.formModel.descripcion,
      };

      this.categoryService.addCategory(body).subscribe({
        next: (res: any) => {
          console.log("Registro exitoso:", res);
          this.getAllCategories();
          this.closeModal();
        },
        error: (err: any) => console.error("Error al registrar:", err)
      });
    }
  }



  // metodos para los filtros de busqueda

  // filterValue = {
  //   ci: '',
  //   role: '',
  //   status: ''
  // }

  // deleteCategory(id: number) {
  //   if (!id) {
  //     return;
  //   }

  //   const confirmed = confirm('¿Estás seguro de eliminar esta categoría?');
  //   if (!confirmed) {
  //     return;
  //   }

  //   this.categoryService.deleteCategory(id).subscribe({
  //     next: (res) => {
  //       console.log('Categoría eliminada:', res);
  //       this.getAllCategories();
  //     },
  //     error: (err) => {
  //       console.error('Error al eliminar la categoría:', err);
  //     }
  //   });
  // }
  
  // searchByCi() {
  //   if (this.filterValue.ci) {
  //     this.categories.searchCategoryByCi(this.filterValue.ci).subscribe({
  //       next: (res) => {
  //         this.categories = res.data || [];
  //         console.log("Resultados de búsqueda por CI:", this.categories);
  //       },
  //       error: (err) => console.error("Error en búsqueda por CI:", err)
  //     });
  //   } else {
  //     this.getAllCategories();
  //   }
  // }

  // searchByRole(role: string) {
  //   role = role || this.filterValue.role;
  //   if (role === 'todo') {
  //     this.getAllCategories();
  //     return;
  //   }
    
  //   this.categoryService.searchCategoryByRole(role).subscribe({
  //     next: (res) => {
  //       this.categories = res.data || [];
  //       console.log("Resultados de búsqueda por rol:", this.categories);
  //     },
  //     error: (err) => console.error("Error en búsqueda por rol:", err)
  //   });
  // }

  // searchByStatus(status: string) {
  //   status = status || this.filterValue.status;
  //   this.userService.searchUserByStatus(status).subscribe({
  //     next: (res) => {
  //       this.users = res.data || [];
  //       console.log("Resultados de búsqueda por estado:", this.users);
  //     },
  //     error: (err) => console.error("Error en búsqueda por estado:", err)
  //   });
  // } 


}
