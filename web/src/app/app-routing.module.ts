import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'categorias',    
    loadChildren: './pages/categorias/categorias.module#CategoriasModule'
  }, {
    path: 'produtos',
    loadChildren: './pages/produtos/produtos.module#ProdutosModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
