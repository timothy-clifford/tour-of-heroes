import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {
  @Input() model?: Hero;

  heroForm?: FormGroup;

  powers = [
    'Mind Control',
    'Elemental Control',
    'Telekinesis',
    'Under Water Control',
    'Super Strength',
    'Super Speed',
    'Healing',
    'Shapeshifting',
    'Invisibility',
    'Flight'
  ];


  submitted = false;

  get name() {
    return this.heroForm.get('name');
  }

  get alterEgo() {
    return this.heroForm.get('alterEgo');
  }

  get power() {
    return this.heroForm.get('power');
  }

  get sideKick() {
    return this.heroForm.get('sideKick');
  }

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    if (!this.model) {
      this.model = <Hero>{
        name: '',
        alterEgo: '',
        power: ''
      };
    }
    this.heroForm = new FormGroup({
      name: new FormControl(this.model.name),
      alterEgo: new FormControl(this.model.alterEgo),
      power: new FormControl({value: this.model.power, disabled: this.model.sideKick }),
      sideKick: new FormControl(this.model.sideKick)
    })
  }

  onSubmit() { 
    this.model = <Hero>this.heroForm.value;
    console.log(this.model);
    const action: Observable<any> = this.model.id ? this.heroService.updateHero(this.model) :
      this.heroService.addHero(this.model);
    action.subscribe();
  }

  newHero() {
    this.heroForm.reset();
  }

  handleSideKickChange($evt) {
    this.power.patchValue('Super Strength');
    $evt?.target?.checked ? this.power.disable() : this.power.enable()
  }
}