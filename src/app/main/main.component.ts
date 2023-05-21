import { Component } from '@angular/core';
import { fadeInWithDelay } from '../animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeInWithDelay],
})
export class MainComponent {}
