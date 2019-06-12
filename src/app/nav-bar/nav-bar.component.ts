import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

import { materials } from '../materials';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  materials;
  material: string;

  constructor(
    private data: DataService
  ) {
    this.materials = materials;
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.material = message)
  }

  handleClick(material) {
    this.data.changeMessage(material)
  }

}
