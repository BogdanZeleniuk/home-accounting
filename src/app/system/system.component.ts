import { Component, HostBinding } from '@angular/core';
import { fadeAnimationTrigger } from '../shared/animation/fade.animation';

@Component({
	selector: 'app-system',
	templateUrl: './system.component.html',
	animations: [fadeAnimationTrigger]
})
export class SystemComponent{
	@HostBinding('@fade') a = true;

}