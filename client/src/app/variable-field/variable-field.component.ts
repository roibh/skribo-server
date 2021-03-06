import { Component, OnInit, Input } from '@angular/core';

export const enum VariableField {
  String = 'string',
  Number = 'number',
}



@Component({
  selector: 'app-variable-field',
  templateUrl: './variable-field.component.html',
  styleUrls: ['./variable-field.component.css']
})

export class VariableFieldComponent implements OnInit {

  constructor() { }
  VariableField: any;

  public propertyTypes: string[] = ['string', 'number', 'date', 'date-span', 'account', 'grid', 'url'];
  @Input()
  variable: any;

  @Input()
  mode: string;
  ranges: string[];

  ngOnInit() {
    this.ranges = ['TODAY', 'YESTERDAY', 'LAST_7_DAYS', 'THIS_WEEK_SUN_TODAY',
      'THIS_WEEK_MON_TODAY', 'LAST_WEEK', 'LAST_14_DAYS', 'LAST_30_DAYS',
      'LAST_WEEK', 'LAST_BUSINESS_WEEK', 'LAST_WEEK_SUN_SAT', 'THIS_MONTH', 'LAST_MONTH', 'ALL_TIME'
    ];
  }

}
