import { Component, OnInit } from '@angular/core';

import { PoMenuItem } from '@portinari/portinari-ui';

import { CategoriasService } from './pages/categorias/categorias.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  menus: Array<PoMenuItem> = [
    { label: 'Home', link: 'home' },
    { label: 'Categorias', subItems: []}
  ];

  constructor(
    private categoriasServicce: CategoriasService
  ){}

  ngOnInit(){
    this.obterCategorias();
  }

  obterCategorias(){
    this.categoriasServicce.pegarCategorias().subscribe((res: any) => {
      console.log(res)
      res.forEach((element: any) => {
        this.menus[1].subItems.push({
          label: element.name,
          link: `categoria/${element._id}`
        });
      })      
    });
  }

}
