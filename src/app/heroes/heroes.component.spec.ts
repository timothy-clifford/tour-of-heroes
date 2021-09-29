import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { Hero } from '../hero';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {

    const heroServiceMock = {
      getHeroes: jest.fn(),
      deleteHero: jest.fn()
    };

    heroServiceMock.getHeroes.mockReturnValue(of([
      <Hero>{
        id: 1,
        name: 'Pluto',
        power: 'Telekinesis',
        sideKick: false
      },
      <Hero>{
        id: 1,
        name: 'Charon',
        power: 'Invisibility',
        sideKick: true
      }
    ]));

    await TestBed.configureTestingModule({
      declarations: [ HeroesComponent, MockComponent(HeroSearchComponent) ],
      imports: [ RouterTestingModule.withRoutes([
        { path: '', component: HeroesComponent },
        { path: '**', redirectTo: '' },
      ]) ],
      providers: [ { provide: HeroService, useValue: heroServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
