import { Component } from '@angular/core';
import { TrendingService } from '../trending.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  constructor(private _TrendingService: TrendingService, private _ActivatedRoute: ActivatedRoute) { }


  item: any = null
  loading: boolean = false
  similar: any[] = []
  media_type: string = ''

  ngOnInit(): void {
    this.loading = true
    let { id, mediaType } = this._ActivatedRoute.snapshot.params
    this.media_type = mediaType
    this._TrendingService.getDetails(id, mediaType).subscribe({
      next: (response) => {
        this.item = response
        this.loading = false
      }
    })

    if (this.media_type != 'person') {
      this._TrendingService.getSimilar(id, mediaType).subscribe({
        next: (response) => {
          this.similar = response.results.slice(0, 6)


          this.loading = false
        }
      })
    }

  }

  anotherDetails(id: string, media_type: string) {
    this.loading = true

    this._TrendingService.getDetails(id, media_type).subscribe({
      next: (response) => {
        this.item = response
        this.loading = false
      }
    })

    this._TrendingService.getSimilar(id, media_type).subscribe({
      next: (response) => {
        this.similar = response.results.filter((item: any) => item.poster_path != null).slice(0, 6)


        this.loading = false
      }
    })
  }

}
