import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss']
})
export class TariffComponent implements OnInit {
  filename:string='';
  constructor() { }

  ngOnInit(): void {
  }
  onImageChange(event: any) {
    const file:File=event.target.files[0];
    this.filename=file.name;
    console.warn("uploaded");
    
  }
}
