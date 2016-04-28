import {Component, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {Router} from 'angular2/router'

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styles: ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(private _heroService: HeroService, private _router: Router) { }

  onSelect(hero: Hero) { this.selectedHero = hero; }

  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  gotoDetail() {
    this._router.naviate(['HeroDetail', {id: this.selectedHero.id}]);
  }

}
