import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service: MovieApiService) { }

  ngOnInit(): void {
  }

  searchRes: any = [];

  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  submitForm() {
    console.log(this.searchForm.value, 'Buscar');
    this.service.searchApiData(this.searchForm.value).subscribe( (res) => {
      console.log(res, 'Buscar pelicula');
      this.searchRes = res.results;
    });
  }

}
