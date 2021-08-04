import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  private unsubscribe$: Subject<void> = new Subject<void>();


  constructor(
    private heroService: HeroService,
    private router: Router

  ) { }
  
    ngOnInit() {
      this.getHeroes();
    }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((heroes: Hero[]) => this.heroes = heroes)
      ).subscribe();
  }

  add(): void {
    this.router.navigate(['/details']);
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.addHero({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}