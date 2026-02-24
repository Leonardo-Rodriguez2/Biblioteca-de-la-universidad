import { Routes } from '@angular/router';
import { HomePage } from './pages/home.page/home.page';
import { LibraryPage } from './pages/library.page/library.page';
import { MyLibraryPage } from './pages/my.library.page/my.library.page';
import { DocumentManagementPage } from './pages/document.management.page/document.management.page';
import { LoginPage } from './pages/login.page/login.page';
import { LayoutComponent } from './layout/layout.component/layout.component';
import { authGuard } from './guard/auth.guard-guard';

export const routes: Routes = [
    { path: 'auth/login', component: LoginPage, pathMatch: 'full' },
    { 
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', canActivate: [authGuard], component: HomePage, pathMatch: 'full' },
            { path: 'library', canActivate: [authGuard], component: LibraryPage, pathMatch: 'full' },
            { path: 'myLibrary', canActivate: [authGuard], component: MyLibraryPage, pathMatch: 'full' },
            { path: 'DocumentManagement', canActivate: [authGuard], component: DocumentManagementPage, pathMatch: 'full' },
        ]
    },
    { path: '**', component: LoginPage, pathMatch: 'full' },
];
