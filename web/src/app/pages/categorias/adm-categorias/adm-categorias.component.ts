import { Component, OnInit, ViewChild } from '@angular/core';
import { PoTableColumn, PoTableAction, PoTableComponent } from '@portinari/portinari-ui';
import { CategoriasService } from '../categorias.service';
import { Router } from "@angular/router";
import { AppComponent } from '../../../app.component';

@Component({
  selector: "app-adm-categorias",
  templateUrl: "./adm-categorias.component.html",
  styleUrls: ["./adm-categorias.component.css"]
})
export class AdmCategoriasComponent implements OnInit {
  columns: Array<PoTableColumn> = [
    { property: "id", visible: false },
    { property: "name", label: "Nome" },
    { property: "descricao", label: "Descrição" }
  ];

  actions: Array<PoTableAction> = [
    { label: "Editar", action: this.redirectToEdit.bind(this) }
  ];

  items: Array<any> = [];

  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;

  constructor(
    private categoriasServicce: CategoriasService,
    private router: Router,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.obterCategorias();
  }

  redirectToEdit(item) {
    const cateogriaId = item.id;
    this.router.navigate([`/categorias/editar/${cateogriaId}`]);
  }

  excluirCategorias(){
    const selectItems = this.poTable.getSelectedRows();    
    selectItems.forEach(element => {
      this.categoriasServicce.deletarCategoria(element.id).subscribe((res: any) => {
        const indexToRemove = this.items.findIndex(x => x.id === element.id);
        this.items.splice(indexToRemove, 1);
        this.appComponent.obterCategorias();
      });
    });        
  }

  obterCategorias() {
    this.categoriasServicce.pegarCategorias().subscribe((res: any) => {
      res.forEach((element: any) => {
        this.items.push({
          id: element._id,
          name: element.name,
          descricao: element.descricao
        });
      });
    });
  }
}
