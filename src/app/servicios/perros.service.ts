import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Perro {
  id: number,
  raza: string,
  edad: string,
  tamano: string,
  edad_numero: number,
  sexo: string,
  apto_gatos: string,
  leishmania: string,
  localizacion: string,
  descripcion: string,
  imagen: string,
  nombre_perro: string,
  nombre: string,
  provincia: string,
  localidad: string
}



@Injectable({
  providedIn: 'root'
})


export class PerrosService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "http://localhost:3000/api/perros";
  }


  getAllDogs(): Promise<Perro[]> {
    return this.httpClient.get<Perro[]>(this.baseUrl).toPromise();
  }

  getDogsByAge(pEdad): Promise<Perro[]> {
    return this.httpClient.get<Perro[]>(`${this.baseUrl}/edad/${pEdad}`).toPromise();
  }

  getDogsBySize(pTamano): Promise<Perro[]> {
    return this.httpClient.get<Perro[]>(`${this.baseUrl}/tamano/${pTamano}`).toPromise();
  }


  getDogsByAgeAndSize(pEdad, pTamano): Promise<Perro[]> {
    return this.httpClient.get<Perro[]>(`${this.baseUrl}/${pEdad}/${pTamano}`).toPromise();
  }

  favoritesDogs(pIdPerro): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": localStorage.getItem("token_adoptantes")
      })
    }

    return this.httpClient.get<any>(`${this.baseUrl}/add/favoritos/${pIdPerro}`, httpOptions).toPromise();
  }



}
