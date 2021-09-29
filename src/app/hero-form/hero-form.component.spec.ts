import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';

import { HeroFormComponent } from './hero-form.component';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(async () => {

    const heroServiceMock = {
      updateHero: jest.fn(),
      addHero: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [ HeroFormComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [{ provide: HeroService, useValue: heroServiceMock }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match a snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
