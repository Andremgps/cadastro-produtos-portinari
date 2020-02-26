import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  api: String = `${environment.apiEndPoint}`;

  constructor(
    private http: HttpClient
  ) { }

  pegarProdutosPorId(produtoId: string){
    let params = new HttpParams();
    params = params.set('produtoId', produtoId);
    return this.http.get(`${this.api}/produtos`, {params });
  }

  pegarProdutosPorCategoria(categoria){
    return this.http.get(`${this.api}/produtos/${categoria}`);
  }

  pegarProdutos(){
    return this.http.get(`${this.api}/produtos`);
  }

  criarProduto(name: string, descricao: string = "", preco: any = "", categorias: any = [],imagem: any){
    const formData = new FormData();
    formData.append('name', name);
    formData.append('descricao', descricao);
    formData.append('preco', preco.toString());
    formData.append('categorias', JSON.stringify(categorias));
    formData.append('imagem', imagem);
    return this.http.post(`${this.api}/produto`, formData);
  }

  atualizarProduto(id: string, name: string, descricao: string, preco: any = "", categorias: any = [], imagem: any){
    const formData = new FormData();
    formData.append('name', name);
    formData.append('descricao', descricao);
    formData.append('preco', preco.toString());
    formData.append('categorias', JSON.stringify(categorias));
    if(imagem){
      formData.append('imagem', imagem);
    }    
    return this.http.put(`${this.api}/produto/${id}`, formData);
  }

  deletarProduto(id: string){
    return this.http.delete(`${this.api}/produto/${id}`);
  }
}
