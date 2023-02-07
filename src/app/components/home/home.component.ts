import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'src/app/services/movie-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: MovieApiService) { }

  bannerRes: any = [];
  trendingRes: any = [];

  ngOnInit(): void {
    this.banner();
    this.trendingMovies();
  }

  // banner

  banner(){
    this.service.bannerApiData().subscribe( (res) => {
      console.log(res, 'banner');
      this.bannerRes = res.results;
    });
  }

  // Peliculas en tendencia

  trendingMovies(){
    this.service.trendingApiData().subscribe( (res) => {
      //console.log(res, 'trending');
      this.trendingRes = res.results;
    });
  }

}
