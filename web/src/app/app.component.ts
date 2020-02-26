import { Component, OnInit } from '@angular/core';

import { PoMenuItem, PoNavbarItem } from '@portinari/portinari-ui';

import { CategoriasService } from './pages/categorias/categorias.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  menus: Array<PoMenuItem> = [
    { label: 'Home', link: 'home'},
    { label: 'Categorias', subItems: []},
    { label: 'Administração', subItems: [
      { label: 'Categorias', link: 'categorias/administrar'},
      { label: 'Produtos', link: 'produtos/administrar'}
    ]}
  ];  

  navItens: Array<PoNavbarItem> = [
    { label: 'Home', link: 'home' },
    { label: 'Categorias', link: 'categorias' },
    { label: 'Produtos', link: 'produtos' }    
  ]

  constructor(
    private categoriasServicce: CategoriasService
  ){}

  ngOnInit(){
    this.obterCategorias();
  }

  obterCategorias(){
    this.categoriasServicce.pegarCategorias().subscribe((res: any) => {
      this.menus[1].subItems = [];
      res.forEach((element: any) => {
        this.menus[1].subItems.push({
          label: element.name,
          link: `categorias/categoria/${element._id}`
        });
      })      
    });
  }

}
