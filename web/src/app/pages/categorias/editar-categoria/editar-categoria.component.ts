import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoNotificationService, PoMultiselectOption } from "@portinari/portinari-ui";
import { CategoriasService } from '../categorias.service';
import { Router } from "@angular/router";
import { AppComponent } from '../../../app.component';
import { ProdutosService } from '../../produtos/produtos.service';

@Component({
  selector: "app-editar-categoria",
  templateUrl: "./editar-categoria.component.html",
  styleUrls: ["./editar-categoria.component.css"]
})
export class EditarCategoriaComponent implements OnInit {
  edicaoTitle: String = 'Edição: ';
  name: String;
  descricao: String;
  produtos: Array<any>;
  produtoOptions: Array<PoMultiselectOption> = [];

  constructor(
    private route: ActivatedRoute,    
    private categoriasService: CategoriasService,
    private poNotification: PoNotificationService,
    private router: Router,
    private produtosService: ProdutosService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {    
    this.route.paramMap.subscribe(params => {
      const categoriaId = params.get("id");
      this.loadProductOptions(categoriaId);
      this.categoriasService
        .pegarCategoriaPorId(categoriaId)
        .subscribe((res: any) => {
          this.edicaoTitle += res.name;
          this.name = res.name;
          this.descricao = res.descricao;
        });      
    });
  }

  atualizarCategoria(){
    if(!this.name){
      this.poNotification.error("Preencha o nome da Categoria");
    }else{
      this.route.paramMap.subscribe(params => {
        const categoriaId = params.get("id");
        this.categoriasService
          .atualizarCategoria(categoriaId, this.name, this.descricao)
          .subscribe((res: any) => {
            this.poNotification.success("Atualizado com sucesso");            
            const categoryId = res._id;
            this.updateCategoryInProducts(categoryId);            
            this.router.navigate(['/categorias/administrar']);
            this.appComponent.obterCategorias();
          });
      }); 
    }    
  }

  loadProductOptions(categoriaId: string) {
    this.produtosService.pegarProdutos().subscribe((res: any) => {
      res.forEach(element => {
        this.produtoOptions.push({
          value: element._id,
          label: element.name
        })
      })
    }, error => console.error(error), () => {
      this.setProductOptions(categoriaId);
    })
  }

  setProductOptions(categoriaId: string){
    this.produtosService.pegarProdutosPorCategoria(categoriaId).subscribe((res: any) => {
      const optionsValue = res.map(x => x._id);
      this.produtos = optionsValue;
    })
  }

  updateCategoryInProducts(categoryId: string) {        
    this.produtosService.deletarCategoriaInProduto(categoryId).subscribe(() => { return }, error => {
      console.error(error);
    }, () => {
      this.produtos.forEach(element => {
        this.produtosService.pushCategoria(element, categoryId).subscribe();
      });
    })          
  }
}
