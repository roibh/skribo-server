import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-full-editor',
  templateUrl: './full-editor.component.html',
  styleUrls: ['./full-editor.component.css']
})
export class FullEditorComponent implements OnInit, OnChanges {
  text;
  options;
  onChange;
  public editor;
  public dummy = true;


  @Output()
  notify: EventEmitter<string> = new EventEmitter<string>();



  public _code: string;

  @Input('script-name') scriptName: string;

  @Input()
  set code(code: string) {
    if (code !== this._code) {
      this._code = code;
    }

  }
  @Input() variables: any;


  editorOptions;


  constructor() {
    this.options = { printMargin: false };
    this.onChange = (data) => {

      this.code = data;
      // this.notify.emit(this.code);
    };
  }
  ngOnChanges(changes: any) {
    // this.notify.emit(changes.currentValue);
  }
  fullEdit() {
    window.open('assets/monaco.html');
  }

  onInit(editor) {
    this.editor = editor;

  }

  ngOnInit() {

    // require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
    // require(['vs/editor/editor.main'], function() {
    //     var editor = monaco.editor.create(document.getElementById('container'), {
    //         value: [
    //             'function x() {',
    //             '\tconsole.log("Hello world!");',
    //             '}'
    //         ].join('\n'),
    //         language: 'javascript'
    //     });
    // });

    this.editorOptions = { automaticLayout: true, theme: 'vs-dark', language: 'javascript' };
    const interval = setInterval(() => {

      if (!(window as any).monaco) {
        return;
      }

      clearInterval(interval);





      const fileName = `types/${this.scriptName}.d.ts`;
      const javascriptDefaults = (window as any).monaco.languages.typescript.javascriptDefaults;
      javascriptDefaults._extraLibs = {};
      // extra libraries
      if (!javascriptDefaults._extraLibs[fileName]) {
        if (!this.variables || !Array.isArray(this.variables)) {
          this.variables = [];
        }

        javascriptDefaults.addExtraLib([
          'declare class SkriboEnv {',
          ...this.variables.map((item) => {
            return `public static ${item.name}:any;`;
          }),
          'declare class Logger {',
          'static log(item:any, item1?:any, item2?:any, item3?:any):void;',
          '}',
          'declare class Util {',
          'static timespanToRange(timespan:string):{start: string, end:string};',
          '}',
          'declare class MccApp {',
          'static accounts();',
          'static select(account);',
          '}',
          'declare class Analytics {',
          'static Management: any ;',
          '};',
          'declare class AdWordsApp {',
          'static ads();',
          'static adGroups();',
          'static campaigns();',
          'static keywords();',
          'static report(query: string, options?:any);',
          'static currentAccount();',
          'static createLabel(label: string, description: string);',
          '};',
          'declare function SkriboPostResults(objectString:string);',
          'declare function SkriboLog(obj: any);',
          'declare function SkriboForAccounts(cb: Function, limit: number);',
          'declare const SkriboSyncUrl:string;',
          'declare class UrlFetchApp {',
          'static fetch(url:string, options: any)',
          '}',


          'declare class Utilities {',
          'static formatDate(date, timeZone, format)',
          '}',

          'declare class SpreadsheetApp {',
          'static create(name:string, cols?:number,rows?:number)',
          'static open(name:string)',
          'static openByUrl(SPREADSHEET_URL);',
          '}',
          'declare class DriveApp {',
          'static getFileById(name:string)',
          'static getRootFolder()',
          '}',
          'declare class Charts {',
          'static Position:any',
          '}'
        ].join('\n'), fileName);
      }

      this.editor = (window as any).monaco.editor.create(document.getElementById('monacocontainer'), {
        value: this._code,
        language: 'javascript',
        automaticLayout: true, theme: 'vs-dark',
      });

      this.editor.onKeyUp((change) => {
        console.log(this.editor.getValue());
        this.notify.emit(this.editor.getValue());
      });

    }, 500);
  }
}

