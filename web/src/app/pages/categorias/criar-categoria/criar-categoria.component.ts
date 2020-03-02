import { Component, OnInit } from '@angular/core';
import { PoNotificationService, PoMultiselectOption } from '@portinari/portinari-ui';
import { CategoriasService } from '../categorias.service';
import { AppComponent } from '../../../app.component';
import { ProdutosService } from '../../produtos/produtos.service';

@Component({
  selector: "app-criar-categoria",
  templateUrl: "./criar-categoria.component.html",
  styleUrls: ["./criar-categoria.component.css"]
})
export class CriarCategoriaComponent implements OnInit {
  
  name: String;
  descricao: String;
  produtos: Array<any>;
  produtoOptions: Array<PoMultiselectOption> = [];

  constructor(
    private poNotification: PoNotificationService,
    private categoriasServcie: CategoriasService,
    private produtosService: ProdutosService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.loadProductOptions();
  }

  loadProductOptions(){
    this.produtosService.pegarProdutos().subscribe((res: any) => {
      res.forEach(element => {
        this.produtoOptions.push({
          value: element._id,
          label: element.name
        })
      })
    })
  }

  addCategoryToProducts(categoryId: string){
    this.produtos.forEach(element => {
      this.produtosService.pushCategoria(element, categoryId).subscribe();
    });
  }

  criarCategoria() {   
    if(!this.name){
      this.poNotification.error("Preencha o Nome da Categoria");
    }else{
      this.categoriasServcie.criarCategoria(this.name, this.descricao).subscribe((res: any) => {
        this.poNotification.success("Criado com sucesso");
        this.appComponent.obterCategorias();
        if(this.produtos && this.produtos.length){
          const categoryId = res._id;
          this.addCategoryToProducts(categoryId);
        }
      });      
    } 
  }
}
