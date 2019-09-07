import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { fadeAnimationTrigger } from '../../shared/animation/fade.animation';
import { Title } from '@angular/platform-browser';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimationTrigger]
})
export class LoginComponent implements OnInit {

	private form: FormGroup;
	message: Message;

  constructor(private usersService: UsersService, 
  	private authService: AuthService,
  	private router: Router,
  	private activatedRoute: ActivatedRoute,
    private title: Title) { 

    title.setTitle('Login user page');
  }

  ngOnInit() {

  	this.message = new Message('danger', '');

  	// create message obj with params text & type
  	this.activatedRoute.queryParams.subscribe((params: Params) => {
  		if(params['canLogin']){
  			this.showMessage({
  				text: 'Now you can enter into system!', 
  				type: 'success'
  			});
  		}
      else if(params['accessDenied']){
        this.showMessage({
          text: 'you are not loged in', 
          type: 'warning'
        });
      }
  	});

  	this.form = new FormGroup({
  		'email': new FormControl(null, [Validators.required, Validators.email]),
  		'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  	});
  }

  private showMessage(message: Message){
  	this.message = message;
  	window.setTimeout(() => {
  		this.message.text = '';
  	}, 5000);
  }

  onSubmit(){
  	const formData = this.form.value;

  	this.usersService
  			.getUserByEmail(formData.email)
  			.subscribe((user:User) => {
  				if(user){
  					if(user.password === formData.password){
  						this.message.text = '';
  						window.localStorage.setItem('user', JSON.stringify(user));
  						this.authService.login();
              this.router.navigate(['/system', 'bill']);
  					}
  					else{
  						this.showMessage({
  							text: 'Wrong password',
  							type: 'danger'
  						});
  					}	
  				}
  				else{
  					this.showMessage({
  						text: 'There is no user with this email',
  						type: 'danger'
  					});
  				}
  			})
  }
}
