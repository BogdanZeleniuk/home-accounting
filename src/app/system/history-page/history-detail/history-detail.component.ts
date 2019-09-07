import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { AppEvent } from '../../shared/models/event.model';
import { Subscription } from 'rxjs';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

	event: AppEvent;
	category: Category;
	isLoaded = false;
	sub1: Subscription;

  constructor(private route: ActivatedRoute, private eventsService: EventsService,
  	private categoriesService: CategoriesService) {}

  ngOnInit() {
  	this.sub1 = this.route.params
  	.pipe(mergeMap((params: Params) => 
  		this.eventsService.getEventById(params['id'])
  	))
  	.pipe(mergeMap((event: AppEvent) => {
  		this.event = event;
  		return this.categoriesService.getCategoryById(event.category);
  	}))
  	.subscribe((category: Category) => {
  		this.category = category;
  		this.isLoaded = true;
  	})
  }
  ngOnDestroy(){

  	if(this.sub1) {
  		this.sub1.unsubscribe();
  	}
  }

}
