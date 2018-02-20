import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { HeaderComponent, SidebarComponent } from '../shared';

@NgModule({
    imports: [
        CommonModule,
        // NgbDropdownModule.forRoot(),s
        NgbModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        // HeaderComponent,
        // SidebarComponent
    ],
    providers: [NgbActiveModal]
})
export class LayoutModule { }
