import { Component, OnInit } from '@angular/core';
import { ProdutosService } from './produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  private produtos: Array<any> = [];

  constructor(
    private produtosService: ProdutosService
  ) { }

  ngOnInit() {
    this.obterProdutos();
  }

  obterProdutos(){
    this.produtosService.pegarProdutos().subscribe((res: any) => {
      this.produtos = res;
    });
  }

}
