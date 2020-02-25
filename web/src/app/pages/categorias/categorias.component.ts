import { Component, OnInit } from '@angular/core';
import { CategoriasService } from './categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Array<any> = [];

  constructor(
    private categoriasService: CategoriasService
  ) { }

  ngOnInit() {
    this.obterCategorias();
  }

  obterCategorias() {
    this.categoriasService.pegarCategorias().subscribe((res: any) => {
      res.forEach((element: any) => {        
          this.categorias.push({
            name: element.name,
            descricao: element.descricao,
            url: `categoria/${element._id}`
          });
      });
    });
  }

}
