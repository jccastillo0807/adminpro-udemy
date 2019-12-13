import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ],
    exports: [
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ],
    imports: [
        RouterModule,
        CommonModule
    ]
})

export class SharedModule { }