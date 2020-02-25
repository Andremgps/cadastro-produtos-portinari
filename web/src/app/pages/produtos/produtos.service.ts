import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  api: String = `${environment.apiEndPoint}`;

  constructor(
    private http: HttpClient
  ) { }

  pegarProdutosPorCategoria(categoria){
    return this.http.get(`${this.api}/produtos/${categoria}`);
  }

  pegarProdutos(){
    return this.http.get(`${this.api}/produtos`);
  }

  criarProduto(name: String, descricao: String, preco: Number){
    return this.http.post(`${this.api}/produto`, {
      name,
      descricao,
      preco
    })
  }
}
