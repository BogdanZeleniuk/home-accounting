import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

	private form: FormGroup;

  constructor(private usersService: UsersService, private router: Router, private title: Title) { 
    title.setTitle('Registration user page');
  }

  ngOnInit() {
  	this.form = new FormGroup({
  		'email': new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmails.bind(this)),
  		'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
  		'name': new FormControl(null, [Validators.required]),
  		'agree': new FormControl(false, [Validators.required, Validators.requiredTrue])
  	});
  }

  onSubmit(){
  	const formData = this.form.value;

  	this.usersService.createNewUser(
  		new User(formData.email, formData.password, formData.name))
  			.subscribe(() => {
  				this.router.navigate(["/login"], { // redirect to login page with param 'canLogin'=true
  					queryParams: {
  						canLogin: true
  					}
  				});
  			});
  }

// create new Validator for email input
  forbiddenEmails(control: FormControl): Promise<any>{
  	return new Promise((resolve, reject) => {
  		this.usersService.getUserByEmail(control.value)
  			.subscribe((user: User) => {
  				if(user){
  					resolve({forbiddenEmail: true}); // 'forbiddenEmail' is the name of Validator
  				}
  				else{
  					resolve(null);
  				}
  			});
  	});
  }

}
