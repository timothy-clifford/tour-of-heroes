import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  public hero?: Hero;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getHero(id);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  getHero(id): void {
    this.heroService.getHero(id)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((hero: Hero) => this.hero = hero)
      ).subscribe();
  }

  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
      .pipe(
        takeUntil(this.unsubscribe$),
        map(_ => this.goBack())
      ).subscribe();
    }
  }

}
