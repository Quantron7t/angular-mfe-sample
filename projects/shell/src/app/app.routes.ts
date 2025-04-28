import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'welcome', component: HomeComponent },
    {
        path: 'todo',
        loadComponent: () => loadRemoteModule('todo','./Component').then((m)=> m.AppComponent)
    },
    { path: '**', component: HomeComponent }
];
