import { Component, OnInit } from '@angular/core';
import { NgFor} from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroSearchComponent } from "../hero-search/hero-search.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NgFor, RouterLink, RouterModule, HeroSearchComponent]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
