import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

	@Output()onFilterCancel = new EventEmitter<any>();
	@Output()onFilterApply = new EventEmitter<any>();

	timePeriods = [
		{type: 'd',
		label: 'Day'},

		{type: 'w',
		label: 'Week'},

		{type: 'M',
		label: 'Month'}
	]

	selectedPeriod = 'd';
	selectedTypes = [];
	selectedCategories = [];

	types = [
		{type: 'income', 
		label: 'Income'},

		{type: 'outcome', 
		label: 'Outcome'}
	]

	@Input()categories: Category[] = [];

  constructor() { }

  ngOnInit() {
  }

  closeFilter(){
  	this.selectedTypes = [];
  	this.selectedCategories = [];
  	this.selectedPeriod = 'd';

  	this.onFilterCancel.emit();
  }

  handleChangeType({checked, value}){
  	if(checked){
  		if(this.selectedTypes.indexOf(value) === -1){
  			this.selectedTypes.push(value);
  		}
  		return;
  	}
  	else{
  		this.selectedTypes = this.selectedTypes.filter(i => i !== value);
  	}
  }

  handleChangeCategory({checked, value}){
  	if(checked){
  		if(this.selectedCategories.indexOf(value) === -1){
  			this.selectedCategories.push(value);
  		}
  		return;
  	}
  	else{
  		this.selectedCategories = this.selectedCategories.filter(i => i !== value);
  	}
  }

  applyFilter(){
  	this.onFilterApply.emit({
  		types: this.selectedTypes,
  		categories: this.selectedCategories,
  		period: this.selectedPeriod
  	});
  }

}
