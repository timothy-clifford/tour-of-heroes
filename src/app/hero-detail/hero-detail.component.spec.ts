import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { HeroService } from '../hero.service';

import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async () => {
    const heroServiceMock = {
      getHero: jest.fn(),
      updateHero: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent, MockComponent(HeroFormComponent) ],
      imports: [ RouterTestingModule.withRoutes([
        { path: '', component: HeroDetailComponent },
        { path: '**', redirectTo: '' },
      ]), CommonModule],
      providers: [{ provide: HeroService, useValue: heroServiceMock }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
