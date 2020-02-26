import { Component, OnInit } from '@angular/core';
import { PoNotificationService, PoMultiselectOption } from '@portinari/portinari-ui';
import { ProdutosService } from '../produtos.service';
import { CategoriasService } from '../../categorias/categorias.service';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.css']
})
export class CriarProdutoComponent implements OnInit {

  name: string;
  descricao: string;
  preco: Number;
  categorias: Array<string>;
  imagem: any;
  imagePath: string;
  imgURL: any;
  iconControl: String = 'po-icon-upload-cloud';
  categoriaOptions: Array<PoMultiselectOption> = [];

  constructor(
    private poNotification: PoNotificationService,  
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService
  ) { }

  ngOnInit() {
    this.loadCategoryOptions();
  } 

  loadCategoryOptions(){
    this.categoriasService.pegarCategorias().subscribe((res: any) =>{
      res.forEach(element => {
        this.categoriaOptions.push({
          value: element._id,
          label: element.name
        })
      })
    })
  }

  preview(files) {
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.poNotification.error("Apenas Imagens são aceitas.");
      return;
    }
    this.imagem = files[0];
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);    
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.iconControl = 'po-icon-edit'
    }
  }

  criarProduto(){
    if(!this.name){
      this.poNotification.error("Preencha o Nome do Produto");
    }else{      
      this.produtosService.criarProduto(
        this.name, 
        this.descricao,
        this.preco,
        this.categorias,
        this.imagem
      ).subscribe((res: any) => {
        this.poNotification.success("Criado com sucesso");
      })
    }
  }

}
