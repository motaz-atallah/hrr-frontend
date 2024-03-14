import { ComponentFixture, TestBed, tick, fakeAsync, flush } from '@angular/core/testing';
import { SliderImageComponent } from './slider-image.component';

describe('SliderImageComponent', () => {
  let component: SliderImageComponent;
  let fixture: ComponentFixture<SliderImageComponent>;

  const slides = [
    {
      url: '/assets/images/photo-slide-1.jpg',
      title: 'First slide',
      description: 'This is the first slide',
    },
    {
      url: '/assets/images/photo-slide-2.jpg',
      title: 'Second slide',
      description: 'This is the second slide',
    },
    {
      url: '/assets/images/photo-slide-3.jpg',
      title: 'Third slide',
      description: 'This is the third slide',
    },
    {
      url: '/assets/images/photo-slide-4.jpg',
      title: 'Fourth slide',
      description: 'This is the fourth slide',
    },
    {
      url: '/assets/images/photo-slide-5.jpg',
      title: 'Fifth slide',
      description: 'This is the fifth slide',
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderImageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SliderImageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentSlide to 0', () => {
    expect(component.currentSlide).toBe(0);
  });

  it('should move to the next slide', fakeAsync(() => {
    component.slides = slides;
    component.currentSlide = 0;

    component.next();
    tick(component.animationSpeed);

    expect(component.currentSlide).toBe(1);
    flush();
  }));

  it('should move to the previous slide', fakeAsync(() => {
    component.slides = slides;
    component.currentSlide = 1;

    component.previous();
    tick(component.animationSpeed);

    expect(component.currentSlide).toBe(0);
    flush();
  }));

  it('should move to the last slide when previous is called on first slide', fakeAsync(() => {
    component.slides = slides;
    component.currentSlide = 0;

    component.previous();
    tick(component.animationSpeed);
    expect(component.currentSlide).toBe(slides.length - 1);
    flush();
  }));

  it('should move to the first slide when next is called on last slide', fakeAsync(() => {
    component.slides = slides;
    component.currentSlide = slides.length - 1;

    component.next();
    tick(component.animationSpeed);

    expect(component.currentSlide).toBe(0);
    flush();
  }));

  it('should jump to a specific slide', fakeAsync(() => {
    component.slides = slides;
    component.currentSlide = 0;

    component.jumpToSlide(2);
    tick(component.animationSpeed);

    expect(component.currentSlide).toBe(2);
    flush();
  }));

  it('should set hidden to true when jumping to a slide', fakeAsync(() => {
    component.jumpToSlide(1);

    expect(component.hidden).toBeTrue();
    tick(component.animationSpeed);
    expect(component.hidden).toBeFalse();
    flush();
  }));
});
