import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosComponent } from './produtos.component';
import { AdmProdutosComponent } from './adm-produtos/adm-produtos.component';
import { CriarProdutoComponent } from './criar-produto/criar-produto.component';


const routes: Routes = [
  {
    path: "",
    component: ProdutosComponent
  },
  {
    path: "administrar",
    component: AdmProdutosComponent
  },
  {
    path: "criar",
    component: CriarProdutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
