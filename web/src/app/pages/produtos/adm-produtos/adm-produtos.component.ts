import { Component, OnInit } from '@angular/core';
import { PoTableColumn, PoTableAction } from '@portinari/portinari-ui';
import { ProdutosService } from '../produtos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-produtos',
  templateUrl: './adm-produtos.component.html',
  styleUrls: ['./adm-produtos.component.css']
})
export class AdmProdutosComponent implements OnInit {
  columns: Array<PoTableColumn> = [
    { property: 'id', visible: false},
    { property: 'name', label: 'Nome'},
    { property: 'descricao', label: 'Descrição'},
    { property: 'preco', label: 'Preço', type: 'number'}
  ]

  actions: Array<PoTableAction> = [
    { label: 'Editar'}
  ]

  items: Array<any> = [];

  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.obterProdutos();
  }

  obterProdutos(){
    this.produtosService.pegarProdutos().subscribe((res: any) => {
      res.forEach((element: any) => {
        this.items.push({
          id: element._id,
          name: element.name,
          descricao: element.descricao,
          preco: element.preco
        })
      });
    })
  }

}
