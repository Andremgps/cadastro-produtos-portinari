import { Component, OnInit } from '@angular/core';
import { PoMultiselectOption, PoNotificationService } from '@portinari/portinari-ui';
import { ProdutosService } from '../produtos.service';
import { CategoriasService } from '../../categorias/categorias.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  edicaoTitle: string = 'Edição: ';
  name: string;
  descricao: string;
  preco: Number;
  categorias: Array<string> = [];
  imagem: any;
  imagePath: string;
  imgURL: any;
  iconControl: string = 'po-icon-upload-cloud';
  categoriaOptions: Array<PoMultiselectOption> = [];

  constructor(
    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCategoryOptions();
  }

  loadFormValues(){
    this.route.paramMap.subscribe(params => {
      const produtoId = params.get("id");
      this.produtosService.pegarProdutosPorId(produtoId)
        .subscribe((res: any) => {
          this.edicaoTitle += res[0].name;
          this.name = res[0].name;
          this.descricao = res[0].descricao;
          this.preco = res[0].preco;
          this.categorias = res[0].categorias;          
          this.imgURL = res[0].imagem_url;
          this.iconControl = this.imgURL ? 'po-icon-edit' : 'po-icon-upload-cloud';
        });
    })
  }

  loadCategoryOptions() {
    this.categoriasService.pegarCategorias().subscribe((res: any) => {
      res.forEach(element => {
        this.categoriaOptions.push({
          value: element._id,
          label: element.name
        })
      })
    }, error => console.error(error), () => {
      //É necessário ter as opções de categorias carregadas
      //Para setalas
      this.loadFormValues();
    });
  }

  atualizarProduto(){
    if(!this.name){
      this.poNotification.error("Preencha o nome do Produto");
    }else{
      this.route.paramMap.subscribe(params => {
        const produtoId = params.get("id");
        this.produtosService
          .atualizarProduto(
            produtoId,
            this.name,
            this.descricao,
            this.preco,
            this.categorias,
            this.imagem
          ).subscribe((res: any) => {
            this.poNotification.success("Atualizado com sucesso");
            this.router.navigate([`/produtos/administrar`]);
          })
      })
    }
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
    console.log(this.categorias);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.iconControl = 'po-icon-edit'
    }
  }

}
