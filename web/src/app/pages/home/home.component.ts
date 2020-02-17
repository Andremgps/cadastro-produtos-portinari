import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  produtos: Array<any> = [
    {
      name: "produto lula",
      descricao: "Lula Livre",
      preco: 99999999,
      imagem: "930cb05f14f6f5d7492d22212614a573-1581892751870.jpg",
      imagem_url: "http://localhost:3333/files/930cb05f14f6f5d7492d22212614a573-1581892751870.jpg"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
