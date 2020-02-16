import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaComponent } from './categoria/categoria.component';
import { PoModule } from '@portinari/portinari-ui';


@NgModule({
  declarations: [
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    PoModule
  ]
})
export class CategoriasModule { }
