import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', power: 'Healing' },
      { id: 12, name: 'Narco', power: 'Under Water Control' },
      { id: 13, name: 'Bombasto', power: 'Super Strength' },
      { id: 14, name: 'Celeritas', power: 'Super Speed'},
      { id: 15, name: 'Magneta', power: 'Elemental Control' },
      { id: 16, name: 'RubberMan', power: 'Shapeshifting' },
      { id: 17, name: 'Dynama', power: 'Elemental Control' },
      { id: 18, name: 'Dr IQ', power: 'Telekinesis' },
      { id: 19, name: 'Magma', power: 'Elemental Control' },
      { id: 20, name: 'Tornado', power: 'Elemental Control' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}