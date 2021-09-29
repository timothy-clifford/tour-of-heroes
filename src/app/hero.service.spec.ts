import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Hero } from './hero';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    const messageServiceMock = {
      add: jest.fn(),
      clear: jest.fn()
    };

    // const httpClientMock = new HttpClientMock()
    // httpClientMock.get = jasmine.createSpy('get').and.returnValue(of([]));
    const httpClientMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: MessageService, useValue: messageServiceMock },
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of heroes and log the action', (done) => {
    const expected = [
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
    ];
    const httpClientMock = TestBed.inject(HttpClient);
    // spyOn(httpClientMock, 'get').and.returnValue(of(expected));
    (httpClientMock.get as jest.Mock).mockReturnValue(of(expected));
    const messageService = TestBed.inject(MessageService)
    const service = TestBed.inject(HeroService);
    service.getHeroes().subscribe((heroes) => {
      expect(messageService.add).toHaveBeenCalledWith('HeroService: fetched heroes');
      expect(httpClientMock.get).toHaveBeenCalledWith('api/heroes');
      expect(heroes).toEqual(expected);
      done();
    });

  });

  it('should return an empty list of heroes when an error occurs getting the heroes', () => {

  });
});
