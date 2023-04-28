import { Component } from '@angular/core';
import { TrendingService } from '../trending.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private _TrendingService: TrendingService) { }

  trendingMovies: any[] = []
  trendingTV: any[] = []
  trendingPeople: any[] = []
  loading: boolean = false

  ngOnInit(): void {
    this.loading = true
    this._TrendingService.getTrending('movie').subscribe({
      next: (response) => {
        this.trendingMovies = response.results.slice(0, 10)
        this.loading = false
      }
    })
    this._TrendingService.getTrending('tv').subscribe({
      next: (response) => {
        this.trendingTV = response.results.slice(0, 10)
        this.loading = false
      }
    })
    this._TrendingService.getTrending('person').subscribe({
      next: (response) => {
        this.trendingPeople = response.results.slice(0, 10)
        this.loading = false
      }
    })
  }

}
