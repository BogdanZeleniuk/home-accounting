import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeAnimationTrigger } from '../shared/animation/fade.animation';
import { Router } from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	animations: [fadeAnimationTrigger]
})
export class AuthComponent implements OnInit{

	@HostBinding('@fade') a = true;


	constructor(private router: Router){}

	ngOnInit(){
		this.router.navigate(['/login']);
	}
}