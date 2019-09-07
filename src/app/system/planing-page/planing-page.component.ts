import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Observable, Subscription } from 'rxjs/Rx';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';

@Component({
  selector: 'app-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit, OnDestroy {

	isLoaded = false;
	bill: Bill;
	categories: Category[];
	events: AppEvent[];

	sub1: Subscription;

  constructor(private billService: BillService, private categoriesService: CategoriesService,
  			private eventsService: EventsService) { }

  ngOnInit() {
  	this.sub1 = Observable.combineLatest(
  		this.billService.getBill(),
  		this.categoriesService.getCategories(),
  		this.eventsService.getEvents()
  		).subscribe((data: [Bill, Category[], AppEvent[]]) => {
  			this.bill = data[0];
  			this.categories = data[1];
  			this.events = data[2];

  		this.isLoaded = true;	
  		});
  }

  ngOnDestroy(){
  	if(this.sub1) {
  		this.sub1.unsubscribe();
  	}
  }

  getCategoryCost(category: Category): number{
  	const categoryEvents = this.events.filter(e => e.category === category.id && e.type === 'outcome');
  	return categoryEvents.reduce((total, e) => {
  		total += e.amount;
  		return total;
  	}, 0);
  }

  private getPercent(cat: Category): number{
  	const percent = (100* this.getCategoryCost(cat)) / cat.capacity;
  	return percent > 100 ? 100: percent; 
  }

  getCatPercent(cat: Category): string{
  	return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string{
  	const percent = this.getPercent(cat);
  	return percent < 60 ? 'success' : percent >=100 ? 'danger' : 'warning';
  }

}
