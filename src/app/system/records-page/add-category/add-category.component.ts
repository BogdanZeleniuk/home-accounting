import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

	@Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
  	let { name, capacity } = form.value;
  	if(capacity < 0){ 
  		capacity *= -1;
  	}

  	const category = new Category(form.value.name, form.value.capacity);
  	this.categoriesService.addCategory(category)
  		.subscribe((category: Category) => {
  			form.reset();
  			form.form.patchValue({capacity: 1});
  			this.onCategoryAdd.emit(category);
  	});
  }

}
