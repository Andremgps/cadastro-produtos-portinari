import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ProdutosService } from '../produtos/produtos.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],  
})
export class HomeComponent implements OnInit {
  urlFundo: string = '/assets/fundo-loja.jpg'

  produtos: Array<any>;

  constructor(
    private router: Router,
    private produtosService: ProdutosService,    
  ) {}

  ngOnInit() {
    this.obterProdutos();
  }

  obterProdutos(){
    this.produtosService.pegarProdutos().subscribe((res: any) => {
      this.produtos = res;     
    })
  }

  redirectLink(){
    this.router.navigate(['/produtos']);
  }
}
