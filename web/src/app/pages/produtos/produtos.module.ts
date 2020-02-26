import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { PoModule, PoButtonModule, PoNotificationModule } from '@portinari/portinari-ui';
import { AdmProdutosComponent } from './adm-produtos/adm-produtos.component';
import { FormsModule } from '@angular/forms';
import { CriarProdutoComponent } from './criar-produto/criar-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';


@NgModule({
  declarations: [
    ProdutosComponent,
    AdmProdutosComponent,
    CriarProdutoComponent,
    EditarProdutoComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    PoNotificationModule,
    PoButtonModule,
    PoModule,
    FormsModule
  ]
})
export class ProdutosModule { }
