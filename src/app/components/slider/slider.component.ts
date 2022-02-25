import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Movies} from '../../models/movies';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
   @Input() sliderConfig;
   @Input()imagesObject:Array<object>;
   @Input()movies:Movies[];
   @Input() title: string;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  selectedMovie(id: number) {
    this.router.navigate(['/movie', id]);
  }
}
