import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoNotificationService } from "@portinari/portinari-ui";
import { CategoriasService } from '../categorias.service';
import { Router } from "@angular/router";
import { AppComponent } from '../../../app.component';

@Component({
  selector: "app-editar-categoria",
  templateUrl: "./editar-categoria.component.html",
  styleUrls: ["./editar-categoria.component.css"]
})
export class EditarCategoriaComponent implements OnInit {
  edicaoTitle: String = 'Edição: ';
  name: String;
  descricao: String;

  constructor(
    private route: ActivatedRoute,    
    private categoriasService: CategoriasService,
    private poNotification: PoNotificationService,
    private router: Router,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const categoriaId = params.get("id");
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
            this.router.navigate(['/categorias/administrar']);
            this.appComponent.obterCategorias();
          });
      }); 
    }    
  }
}
