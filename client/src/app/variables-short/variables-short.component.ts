import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-variables-short',
  templateUrl: './variables-short.component.html',
  styleUrls: ['./variables-short.component.css']
})
export class VariablesShortComponent implements OnInit {

  constructor() { }

  @Input()
  public variables: any;

  public objectValues = Object.values;

  ngOnInit() {
  }

}
