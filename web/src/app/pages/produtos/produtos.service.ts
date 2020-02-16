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

  pegarProdutos(categoria){
    return this.http.get(`${this.api}/produtos/${categoria}`);
  }
}
