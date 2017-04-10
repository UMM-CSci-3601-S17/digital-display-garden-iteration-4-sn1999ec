// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {ExportComponent} from "./admin/export.component";
import {ImportComponent} from "./admin/import.component";
import {FlowerComponent} from "./flowers/flower.component";

// Route Configuration
export const routes: Routes = [
    { path: '', component: FlowerComponent},
    { path: 'admin', component: AdminComponent},
    { path: 'admin/exportData', component: ExportComponent},
    { path: 'admin/importData', component: ImportComponent}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);