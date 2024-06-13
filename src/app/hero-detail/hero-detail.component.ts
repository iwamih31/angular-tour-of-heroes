import {Component, Input} from '@angular/core';
import { NgIf, UpperCasePipe, Location,} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';


import {Hero} from '../hero';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    NgIf,
    UpperCasePipe,
    FormsModule,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  constructor(
		private readonly route: ActivatedRoute,
		private heroService: HeroService,
		private location: Location,
	) {}

ngOnInit(): void {
  this.getHero();
}

getHero(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
}

	goBack(): void {
		this.location.back();
	}

	save(): void {
  if (this.hero) {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}

}
