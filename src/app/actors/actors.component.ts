import { Component } from '@angular/core';
import { TrendingService } from '../trending.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent {

  constructor(private _TrendingService: TrendingService) { }

  people: any[] = []
  loading: boolean = false

  ngOnInit(): void {
    this.loading = true
    this._TrendingService.getPeople().subscribe({
      next: (Response) => {
        this.people = Response.results.slice(0, 18)
        this.loading = false
      }
    })
  }

}
