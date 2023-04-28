import { Component } from '@angular/core';
import { TrendingService } from '../trending.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent {

  constructor(private _TrendingService: TrendingService) { }

  TV: any[] = []
  loading: boolean = false

  ngOnInit(): void {
    this.loading = true
    this._TrendingService.getTV().subscribe({
      next: (Response) => {
        this.TV = Response.results.slice(0, 18)
        this.loading = false
      }
    })
  }


}