import { Component, OnInit, ViewChild } from '@angular/core';
import { PoNotificationService, PoUploadComponent } from '@portinari/portinari-ui';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.css']
})
export class CriarProdutoComponent implements OnInit {

  name: String;
  descricao: String;
  preco: Number;
  imageUrl: String = "http://localhost:3333/produto";  

  @ViewChild('upload', { static: true }) upload: PoUploadComponent;

  constructor(
    private poNotification: PoNotificationService,  
  ) { }

  ngOnInit() {
  }

  uploadBegin(event){    
    event.data = {
      name: this.name,
      descricao: this.descricao,
      preco: this.preco
    }
  }  

  criarProduto(){
    if(!this.name){
      this.poNotification.error("Preencha o Nome do Produto");
    }else{      
      this.upload.sendFiles();
      this.poNotification.success("Criado com sucesso");
    }
  }

}
