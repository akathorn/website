import { Component } from '@angular/core';
import { fadeIn } from '../animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeIn],
})
export class MainComponent {}
