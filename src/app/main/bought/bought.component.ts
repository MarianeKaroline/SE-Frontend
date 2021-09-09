import { PreviewBoughtModel } from './models/previewBought.model';
import { BoughtService } from './bought.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bought',
  templateUrl: './bought.component.html',
  styleUrls: ['./bought.component.scss']
})
export class BoughtComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
