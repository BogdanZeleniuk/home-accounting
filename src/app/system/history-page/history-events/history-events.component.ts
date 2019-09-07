import { Component, OnInit, Input } from '@angular/core';

import { AppEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

	@Input() events: AppEvent [] = [];
	@Input() categories: Category [] = [];
  searchValue: string = '';

  searchPlaceholder: string = 'Sum';
  searchField: string = 'amount';

  constructor() { }

  ngOnInit() {
  	this.events.forEach((e)=>{
  		e.catName = this.categories.find(c => c.id === e.category).name;
  	});
  }

  getEventClass(e: AppEvent){
  	return {
  		'label': true,
  		'label-danger': e.type === 'outcome',
  		'label-success': e.type === 'income'
  	}
  }

  changeCriteria(field: string){
    const namesMap = {
      amount: 'amount',
      date: 'date',
      category: 'category',
      type: 'type'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
