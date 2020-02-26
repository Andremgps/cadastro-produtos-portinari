import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../produtos/produtos.service';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  private categoria: String;
  private produtos: Array<Object> = [];

  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const categoriaId = params.get('id');      
      this.categoriasService.pegarCategoriaPorId(categoriaId).subscribe((res: any) => {        
        this.categoria = res.name;
      })
      this.produtosService.pegarProdutosPorCategoria(categoriaId).subscribe((res: any) =>{
        this.produtos = res;
      });
    })
  }

}
