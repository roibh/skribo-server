import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DynamicFormsBootstrapUIModule } from '@ng-dynamic-forms/ui-bootstrap';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { ModalModule, } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2TableModule, NgTableFilteringDirective, NgTablePagingDirective, NgTableComponent, NgTableSortingDirective } from 'ng2-table';
import { LoadersCssModule } from 'angular2-loaders-css';
import { LoaderComponent } from './loader/loader.component';
import { AdScriptComponent } from './ad-script/ad-script.component';
import { VariablesComponent } from './variables/variables.component';
import { ManageComponent } from './manage/manage.component';
import { InfoComponent } from './info/info.component';
import { FireService } from './fire.service';
import { MotivationService } from './motivation.service';
import { StorageService } from './storage.service';
import { Scripts, Embed, Results, User, Sync } from '@skribo/client';

import { SelectDropDownModule } from 'ngx-select-dropdown';
(window as any).SkriboUrl = 'https://skribo.herokuapp.com';

const serverUrl = (window as any).SkriboUrl;

Embed.base = serverUrl;
Scripts.base = serverUrl;
Results.base = serverUrl;
User.base = serverUrl;
Sync.base = serverUrl;

import * as M from '@methodus/client';
import { LoginComponent } from './login/login.component';
import { InstallComponent } from './install/install.component';
import { UserService } from './user.context.service';

import { EmbedListComponent } from './embed-list/embed-list.component';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
import { ChartComponent } from './chart/chart.component';
import { ResultViewerComponent } from './result-viewer/result-viewer.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FullEditorComponent } from './full-editor/full-editor.component';

import { MonacoEditorModule, NgxMonacoEditorConfig } from '../assets/ngx-monaco-editor';
import { VariableFieldComponent } from './variable-field/variable-field.component';
import { AccountSelectorComponent } from './account-selector/account-selector.component';
import { GridComponent } from './grid/grid.component';
import { VariablesFillComponent } from './variables-fill/variables-fill.component';
import { VariableFieldFillComponent } from './variable-field-fill/variable-field-fill.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { DateSpanComponent } from './date-span/date-span.component';
import { TabsetComponent } from './tabset/tabset.component';
import { ChartInfoComponent } from './chart-info/chart-info.component';
import { ResultsExplorerComponent } from './results-explorer/results-explorer.component';
import { AdaptHeightDirective } from './directives/adapt-height';
import { OrderModule } from 'ngx-order-pipe';
import { VariablesShortComponent } from './variables-short/variables-short.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  AuthService,
} from 'angular-6-social-login';





export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([

    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('648570861176-9ree3n87tog0jjhc918mqo922anov6o2.apps.googleusercontent.com')
    },
  ]);
  return config;
}


export const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: '/assets/', // configure base path for monaco editor
  defaultOptions: { scrollBeyondLastLine: false, automaticLayout: true }, // pass default options to be used
  onMonacoLoad
};
export function onMonacoLoad() {
  const _monaco = (<any>window).monaco;
  // validation settings
  _monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
  });

  // compiler options
  _monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES5,
    allowNonTsExtensions: true
  });
}

const appRoutes: Routes = [
  { path: '', redirectTo: '/adscript/manage', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user/details', component: UserInfoComponent },

  { path: 'adscript/manage/create', component: AdScriptComponent },
  { path: 'adscript/manage/:id/details', component: AdScriptComponent },
  { path: 'adscript/edit/:id/details', component: FullEditorComponent },
  { path: 'adscript/manage/:script_id/:embed_id/:id/spreadsheet', component: ResultViewerComponent },
  { path: 'adscript/manage', component: ManageComponent },
  {
    path: 'adscript/manage/:script_id/explore', component: ResultsExplorerComponent,
    children: [
      { path: ':result_id', component: ResultViewerComponent }
    ]
  },
];

@NgModule({

  declarations: [
    AppComponent,
    DashboardComponent,
    LoaderComponent,
    AdScriptComponent,
    VariablesComponent,
    ManageComponent,
    InfoComponent,
    LoginComponent,
    InstallComponent,
    EmbedListComponent,
    SpreadsheetComponent,
    ChartComponent,
    ResultViewerComponent,
    UserInfoComponent,
    FullEditorComponent,
    VariableFieldComponent,
    AccountSelectorComponent,
    GridComponent,
    VariablesFillComponent,
    VariableFieldFillComponent,
    DateRangeComponent,
    DateSpanComponent,
    TabsetComponent,
    ChartInfoComponent,
    ResultsExplorerComponent,
    AdaptHeightDirective,
    VariablesShortComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: true } // <-- debugging purposes only
    ),
    SocialLoginModule,
    NgxChartsModule,
    SelectDropDownModule,
    NgxDatatableModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    Ng2TableModule,
    SortableModule.forRoot(),
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    LoadersCssModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    DynamicFormsBootstrapUIModule,
    BrowserAnimationsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [FireService, StorageService, UserService, MotivationService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
