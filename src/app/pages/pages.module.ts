import { NgModule } from "@angular/core";

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';

import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
    declarations: [
        PagesComponent,
        ProgressComponent,
        Graficas1Component,
        DashboardComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
    ],
    exports: [
        ProgressComponent,
        Graficas1Component,
        DashboardComponent
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule { }