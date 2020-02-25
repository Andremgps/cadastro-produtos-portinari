import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriasComponent } from './categorias.component';
import { AdmCategoriasComponent } from './adm-categorias/adm-categorias.component';
import { CriarCategoriaComponent } from './criar-categoria/criar-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';

const routes: Routes = [
  {
    path: "",
    component: CategoriasComponent
  },
  {
    path: "categoria/:id",
    component: CategoriaComponent
  },
  {
    path: "administrar",
    component: AdmCategoriasComponent
  },
  {
    path: "criar",
    component: CriarCategoriaComponent
  },
  {
    path: 'editar/:id',
    component: EditarCategoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
