import { NgModule } from "@angular/core";

import { SharedModule } from '../shared/shared.module';

import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
    declarations: [
        PagesComponent,
        ProgressComponent,
        Graficas1Component,
        DashboardComponent
    ],
    exports: [
        ProgressComponent,
        Graficas1Component,
        DashboardComponent
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES
    ]
})

export class PagesModule { }