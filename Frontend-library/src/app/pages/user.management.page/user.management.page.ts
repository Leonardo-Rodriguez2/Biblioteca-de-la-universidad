import { Component, inject, OnInit, ViewChild, ElementRef, PLATFORM_ID } from '@angular/core';
import { ServiceUsers } from '../../services/service.users/service.users';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user.management.page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.management.page.html',
  styleUrl: './user.management.page.css',
})
export class UserManagementPage implements OnInit {
  @ViewChild('userModal') modalRef!: ElementRef<HTMLDialogElement>;
  private userService = inject(ServiceUsers);
  private platformId = inject(PLATFORM_ID);

  users: any[] = [];
  modalStep = 1;
  isEdit = false;

  // Modelo del formulario
  formModel: any = {
    nombre: '',
    ci: '',
    email: '',
    password: '',
    rol: 3,
  };

ngOnInit() {
    // Solo pedimos los usuarios si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.getAllUsers();
    }
  }

getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.data || []; 
        console.log("Usuarios cargados al recargar:", this.users);
      },
      error: (err) => console.error("Error al recargar lista:", err)
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
      nombre: '', ci : '', password: '', email: '', rol: 3 
    };
  }

  
  saveUser() {
    console.log("Intentando guardar...", this.formModel);

    if (this.isEdit) {
      // Verificamos que el ID exista para la ruta: /user/:id
      if (!this.formModel.id) {
        console.error("Error: No se puede actualizar un usuario sin ID");
        return;
      }

      this.userService.updateUser(this.formModel.id, this.formModel).subscribe({
        next: (res) => {
          console.log("Actualización exitosa:", res);
          this.getAllUsers(); // Refrescar tabla
          this.closeModal();  // Cerrar modal
          location.reload()
        },
        error: (err) => console.error("Error al actualizar:", err)
      });

    } else {
      console.log(this.formModel)
      this.userService.addUser(this.formModel).subscribe({
        next: (res) => {
          console.log("Registro exitoso:", res);
          this.getAllUsers();
          this.closeModal();
        },
        error: (err) => console.error("Error al registrar:", err)
      });
    }
  }



  // metodos para los filtros de busqueda

  filterValue = {
    ci: '',
    role: '',
    status: ''
  }
  
  searchByCi() {
    if (this.filterValue.ci) {
      this.userService.searchUserByCi(this.filterValue.ci).subscribe({
        next: (res) => {
          this.users = res.data || [];
          console.log("Resultados de búsqueda por CI:", this.users);
        },
        error: (err) => console.error("Error en búsqueda por CI:", err)
      });
    } else {
      this.getAllUsers();
    }
  }

  searchByRole(role: string) {
    role = role || this.filterValue.role;
    if (role === 'todo') {
      this.getAllUsers();
      return;
    }
    
    this.userService.searchUserByRole(role).subscribe({
      next: (res) => {
        this.users = res.data || [];
        console.log("Resultados de búsqueda por rol:", this.users);
      },
      error: (err) => console.error("Error en búsqueda por rol:", err)
    });
  }

  searchByStatus(status: string) {
    status = status || this.filterValue.status;
    this.userService.searchUserByStatus(status).subscribe({
      next: (res) => {
        this.users = res.data || [];
        console.log("Resultados de búsqueda por estado:", this.users);
      },
      error: (err) => console.error("Error en búsqueda por estado:", err)
    });
  } 



  // deleteUser(id: number) {
  //   if (confirm('¿Estás seguro de eliminar este usuario?')) {
  //     this.userService.deleteUser(id).subscribe(() => this.getAllUsers());
  //   }
  // }
}