import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-image',
  templateUrl: './slider-image.component.html',
  styleUrls: ['./slider-image.component.scss']
})
export class SliderImageComponent implements OnInit {
  @Input() slides: any[] = [];
  @Input() indicatorsVisible = true;
  @Input() animationSpeed = 500;
  @Input() autoPlay = false;
  @Input() autoPlaySpeed = 3000;
  currentSlide = 0;
  hidden = false;

  next() {
    let currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.jumpToSlide(currentSlide);
  }

  previous() {
    let currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.jumpToSlide(currentSlide);
  }

  jumpToSlide(index: number) {
    this.hidden = true;
    setTimeout(() => {
      this.currentSlide = index;
      this.hidden = false;
    }, this.animationSpeed);
  }

  ngOnInit() {
    if (this.autoPlay) {
      setInterval(() => {
        this.next();
      }, this.autoPlaySpeed);
    }
  }
}
