import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(private http: HttpClient) { }

  baseurl = "https://api.themoviedb.org/3";
  apiKey = "08cc33bd5ae3a747598ce2ad84376e66";

    // Banner con las peliculas en tendencia

    bannerApiData(): Observable<any> {
      return this.http.get(`${this.baseurl}/trending/all/week?api_key=${this.apiKey}&language=es`);
    }

    // Seccion con las peliculas en tendencia del dia

    trendingApiData(): Observable<any> {
      return this.http.get(`${this.baseurl}/trending/all/day?api_key=${this.apiKey}&language=es`);
    }

    // Buscar peliculas o series
    searchApiData(data: any): Observable<any> {
      console.log(data, 'datos pelicula');
      return this.http.get(`${this.baseurl}/search/movie?api_key=${this.apiKey}&query=${data.movieName}&language=es`);
    }

    // Obtener detalles de la pelicula
    MovieDetails(data: any): Observable<any> {
      return this.http.get(`${this.baseurl}/movie/${data}?api_key=${this.apiKey}&language=es`)
    }

    // Obtener trailer
    MovieVideo(data: any): Observable<any> {
      return this.http.get(`${this.baseurl}/movie/${data}/videos?api_key=${this.apiKey}&language=es`)
    }

}
