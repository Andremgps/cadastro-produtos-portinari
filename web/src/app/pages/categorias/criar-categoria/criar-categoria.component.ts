import { Component, OnInit } from '@angular/core';
import { PoNotificationService } from '@portinari/portinari-ui';
import { CategoriasService } from '../categorias.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: "app-criar-categoria",
  templateUrl: "./criar-categoria.component.html",
  styleUrls: ["./criar-categoria.component.css"]
})
export class CriarCategoriaComponent implements OnInit {
  
  name: String;
  descricao: String;

  constructor(
    private poNotification: PoNotificationService,
    private categoriasServcie: CategoriasService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {}

  criarCategoria() {   
    if(!this.name){
      this.poNotification.error("Preencha o Nome da Categoria");
    }else{
      this.categoriasServcie.criarCategoria(this.name, this.descricao).subscribe((res: any) => {
        this.poNotification.success("Criado com sucesso");
        this.appComponent.obterCategorias();
      })
    } 
  }
}
