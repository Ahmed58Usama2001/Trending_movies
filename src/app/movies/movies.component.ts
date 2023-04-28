import { Component } from '@angular/core';
import { TrendingService } from '../trending.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  constructor(private _TrendingService: TrendingService) { }

  movies: any[] = []
  loading: boolean = false

  ngOnInit(): void {
    this.loading = true
    this._TrendingService.getMovies().subscribe({
      next: (Response) => {
        this.movies = Response.results.slice(0, 18)
        this.loading = false
      }
    })
  }

}
