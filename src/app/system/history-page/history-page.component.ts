import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Observable, Subscription } from 'rxjs/Rx';
import * as moment from 'moment';

import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';


@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

	categories: Category [] = [];
	events: AppEvent [] = [];
  filteredEvents: AppEvent [] = [];
	isLoaded = false;
	chartData = [];
	sub1: Subscription;
  isFilterVisible = false;

  constructor(private categoriesService: CategoriesService, private eventsService: EventsService) { }

  ngOnInit() {
  	this.sub1 = Observable.combineLatest(
  		this.categoriesService.getCategories(),
  		this.eventsService.getEvents()
  		).subscribe((data: [Category [], AppEvent []]) => {
  			this.categories = data[0];
  			this.events = data[1];

        this.setOriginalEvents();
  			this.calculateCharData();

  			this.isLoaded = true;
  		});	
  }
  ngOnDestroy(){
  	if(this.sub1) this.sub1.unsubscribe();
  }

  calculateCharData(): void{
  	this.chartData = [];
  	this.categories.forEach((cat) => {
  		const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
  		this.chartData.push({
  			name: cat.name,
  			value: catEvent.reduce((total, e) => {
  				total += e.amount;
  				return total;
  			}, 0)
  		});
  	});
  }

  private toogleFilterVisibility(dir: boolean){
    this.isFilterVisible = dir;
  }

  openFilter(){
    this.toogleFilterVisibility(true);
  }

  onFilterCancel(){
    this.toogleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateCharData();
  }

  setOriginalEvents(){
    this.filteredEvents = this.events.slice();
  }

  onFilterApply(filterData){
    this.toogleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1; 
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      })

      this.calculateCharData();
  }

}
