import { Component, OnInit, ViewContainerRef, NgZone, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.context.service';
import { Results, ScriptModel, Scripts, ResultsDescriptor, ResultsModel } from '@skribo/client';
import * as _ from 'lodash';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-results-explorer',
  templateUrl: './results-explorer.component.html',
  styleUrls: ['./results-explorer.component.css']
})
export class ResultsExplorerComponent implements OnInit {
  activeSheet: any;

  constructor(private router: Router, vcr: ViewContainerRef,
    private route: ActivatedRoute, private userService: UserService, private modalService: BsModalService,
    private _ngZone: NgZone, ) { }
  modalRef: BsModalRef;
  public script_id: string;
  public listOfResults: any[];
  public sheets: any;
  public Data: any;
  public script: ScriptModel;
  public colHeaders: any;
  public identifiers: string[];
  public identifier: string;
  public identifier_prop: string;
  public tableChartData: any;
  public chartDescriptor: any;
  public options: any = {};
  public isChart: boolean;

  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  modalPromise: Function = null;
  message: string;

  async ngOnInit() {
    this.script_id = this.route.snapshot.paramMap.get('script_id');
    const group_id = this.userService.getGroup().GroupId;
    this.script = await Scripts.get(group_id, this.script_id);
    this.chartDescriptor = this.script.ResultsDescriptor.chartDescriptor;
    if (this.chartDescriptor) {
      this.isChart = true;
    }
    this.listOfResults = await Results.listByScript(group_id, this.script_id);
  }

  toggle(row) {
    this._ngZone.run(async () => {
      row.opened = !row.opened;
    });
  }

  async remove(result: ResultsModel, template) {
    this._ngZone.run(async () => {
      try {
        const modalResult = await this.openModal(template);
        if (modalResult) {
          if (this.userService.getGroup()) {
            const group_id = this.userService.getGroup().GroupId;
            await Results.delete(group_id, result.ScriptId, result.EmbedId, result.ResultId);
            this.listOfResults = await Results.listByScript(group_id, this.script_id);

          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  onSelect(data: TabDirective): void {
    this._ngZone.run(async () => {
      this.activeSheet = this.sheets[data.heading];
    });
  }
  async openModal(template: TemplateRef<any>) {
    return new Promise<boolean>((resolve, reject) => {
      this.modalPromise = resolve;
      this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    });
  }

  confirm(): void {
    this.modalPromise(true);
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.modalPromise(false);
    this.message = 'Declined!';
    this.modalRef.hide();
  }




  async showResults(template, row) {
    this.sheets = [];
    this._ngZone.run(async () => {

      const group_id = this.userService.getGroup().GroupId;
      const id = row.ResultId;
      const embed_id = row.EmbedId;
      const script_id = row.ScriptId;
      const result = await Results.get(group_id, script_id, embed_id, id);
      this.Data = result.Data;
      try {
        if (Array.isArray(this.Data)) {
          const objectRow = this.Data[0];

          const columns = Object.keys(objectRow).map((item) => {
            return {
              id: item,
              key: item,
              label: item
              // data: item,
              // description: item,
              // renderer: 'text',
              // readOnly: true
            };
          });
          this.colHeaders = columns;
          // this.options.colHeaders = columns;

          this.tableChartData = {
            chartType: 'Table',
            dataTable: [
              Object.keys(objectRow),
              ...this.Data.map(item => Object.values(item)),
              // ['Shoes', 10700, -100],
              // ['Sports', -15400, 25],
              // ['Toys', 12500, 40],
              // ['Electronics', -2100, 889],
              // ['Food', 22600, 78],
              // ['Art', 1100, 42]
            ],
            formatters: [
              {
                columns: [1],
                type: 'NumberFormat',
                options: {
                  prefix: '&euro;', negativeColor: 'red', negativeParens: true
                }
              }
            ],
            options: { title: row.Name, allowHtml: true }
          };


          if (this.chartDescriptor.identifiers && this.chartDescriptor.identifiers.length > 0) {
            this.identifier_prop = this.chartDescriptor.identifiers[0];
            this.identifiers = _.uniq(this.Data.map(item => item[this.chartDescriptor.identifiers[0]]));
          }

          this.sheets.push({
            name: 'result', rows: this.Data, original_rows: this.Data,
            colHeaders: this.colHeaders, columns: this.colHeaders, options: { autoHeight: true }
          });
        } else {
          Object.keys(this.Data).forEach((key) => {
            const objectRow = this.Data[key][0];
            const colHeaders = Object.keys(objectRow);
            const columns = Object.keys(objectRow).map((item) => {
              return {
                data: item,
                description: item,
                renderer: 'text',
                readOnly: true
              };
            });
            this.sheets.push({
              name: key, colHeaders: Object.keys(objectRow),
              columns: columns, original_rows: this.Data[key], rows: this.Data[key],
              options: { autoHeight: true }
            });
          });
        }
      } catch (error) {
        // this.Data = [{ label: 'url', value: data.results }];
        // this.isChart = false;
      }
    });
  }

  redraw(param) {
    this.sheets.forEach((sheet) => {
      sheet.rows = sheet.original_rows.filter((row) => row[this.identifier_prop] === this.identifier);
    });
  }
}
