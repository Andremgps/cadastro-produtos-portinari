import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaComponent } from './categoria/categoria.component';
import { PoModule } from '@portinari/portinari-ui';
import { CategoriasComponent } from './categorias.component';
import { AdmCategoriasComponent } from './adm-categorias/adm-categorias.component';
import { PoPageDynamicTableModule } from '@portinari/portinari-templates';
import { PoNotificationModule } from "@portinari/portinari-ui";
import { PoButtonModule } from "@portinari/portinari-ui";
import { CriarCategoriaComponent } from './criar-categoria/criar-categoria.component';
import { FormsModule } from "@angular/forms";
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';

@NgModule({
  declarations: [
    CategoriaComponent,    
    CategoriasComponent,
    AdmCategoriasComponent,
    CriarCategoriaComponent,
    EditarCategoriaComponent,
  ],
  imports: [
    CommonModule, 
    CategoriasRoutingModule,
    PoPageDynamicTableModule,
    PoNotificationModule,
    PoButtonModule,
    PoModule,
    FormsModule
  ],
})
export class CategoriasModule { }
