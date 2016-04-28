import {Component, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {RouteParams} from 'angular2/router';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styles: ['app/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero;
  constructor(private _heroService: HeroService, private _routeParams: RouteParams);
  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._heroService.getHero(id).then(hero => this.hero = hero);
  }
  goBack() {
    window.history.back();
  }
}
