import { Component, OnInit } from '@angular/core';
import { BoughtService } from '../bought.service';
import { PreviewBoughtModel } from '../models/previewBought.model';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  preview: PreviewBoughtModel;

  constructor(private boughtService: BoughtService) { }

  ngOnInit(): void {
    console.log("oi");
    this.boughtService.preview()
    .subscribe(preview => {
      console.log(preview);
      this.preview = preview;
    })
  }

}
