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
  SearchFiltersComponents, ModalToAddDocumentComponent
],
  templateUrl: './my.library.page.html',
  styleUrl: './my.library.page.css',
})
export class MyLibraryPage { 














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
