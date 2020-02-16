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

}
