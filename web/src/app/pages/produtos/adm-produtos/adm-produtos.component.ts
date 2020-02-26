import { Component, OnInit, ViewChild } from '@angular/core';
import { PoTableColumn, PoTableAction, PoTableComponent } from '@portinari/portinari-ui';
import { ProdutosService } from '../produtos.service';
import { Router } from '@angular/router';
import { CategoriasService } from '../../categorias/categorias.service';

@Component({
  selector: 'app-adm-produtos',
  templateUrl: './adm-produtos.component.html',
  styleUrls: ['./adm-produtos.component.css']
})
export class AdmProdutosComponent implements OnInit {
  columns: Array<PoTableColumn> = [
    { property: 'id', visible: false},
    { property: 'name', label: 'Nome', width: '10%'},
    { property: 'descricao', label: 'Descrição'},
    { property: 'categorias', label: 'Categorias'},
    { property: 'imagem', label: 'Imagem', link: 'imagem_url', type: 'link', width: '20%'},
    { property: 'preco', label: 'Preço', type: 'number'},
    { property: 'imagem_url', visible: false}
  ];

  actions: Array<PoTableAction> = [
    { label: 'Editar', action: this.redirectToEdit.bind(this) }
  ];

  categoriasContent: Array<any>;

  items: Array<any> = [];

  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;

  constructor(
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoriasService.pegarCategorias().subscribe((res: any) => {
      this.categoriasContent = res;
    }, error => console.error(error), () => this.obterProdutos());    
  }

  redirectToEdit(item){
    const produtoId = item.id;
    this.router.navigate([`/produtos/editar/${produtoId}`]);
  }

  excluirProdutos(){
    const selectItems = this.poTable.getSelectedRows();
    selectItems.forEach(element => {
      this.produtosService.deletarProduto(element.id).subscribe((res: any) => {
        const indexToRemove = this.items.findIndex(x => x.id === element.id);
        this.items.splice(indexToRemove, 1);        
      })
    })
  }

  obterProdutos(){
    this.produtosService.pegarProdutos().subscribe((res: any) => {
      res.forEach((element: any) => {
        this.items.push({
          id: element._id,
          name: element.name,
          descricao: element.descricao,
          categorias: element.categorias.map(x => {
            const { name } = this.categoriasContent.find(y => y._id === x);
            return name;
          }),
          imagem: element.imagem,
          preco: element.preco,
          imagem_url: element.imagem_url
        })
      });
    })
  }

}
