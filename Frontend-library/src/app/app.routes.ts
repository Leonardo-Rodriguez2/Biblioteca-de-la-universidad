import { Routes } from '@angular/router';
import { HomePage } from './pages/home.page/home.page';
import { LibraryPage } from './pages/library.page/library.page';
import { MyLibraryPage } from './pages/my.library.page/my.library.page';
import { DocumentManagementPage } from './pages/document.management.page/document.management.page';

export const routes: Routes = [
    { path: '', component: HomePage, pathMatch: 'full' },
    { path: 'library', component: LibraryPage, pathMatch: 'full' },
    { path: 'myLibrary', component: MyLibraryPage, pathMatch: 'full' },
    { path: 'DocumentManagement', component: DocumentManagementPage, pathMatch: 'full' },
    { path: '**', component: HomePage, pathMatch: 'full' },
];
