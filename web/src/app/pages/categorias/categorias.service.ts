import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  api: String = `${environment.apiEndPoint}`;

  constructor(
    private http: HttpClient,    
  ) { }

  pegarCategorias(){
    return this.http.get(`${this.api}/categorias`);
  }

  pegarCategoriaPorId(categoriaId: string){
    let params = new HttpParams();
    params = params.set('categoriaId', categoriaId);    
    return this.http.get(`${this.api}/searchCategoria`, { params });
  }

  criarCategoria(name: String, descricao: String){
    return this.http.post(`${this.api}/categoria`,{
      name,
      descricao: descricao || ''
    });
  }

  atualizarCategoria(id: String, name: String, descricao: String){
    return this.http.put(`${this.api}/categoria/${id}`, {
      name,
      descricao
    })
  }

  deletarCategoria(id: String){
    this.http.delete(`${this.api}/produtos/${id}`).subscribe();
    return this.http.delete(`${this.api}/categoria/${id}`);
  }

}
