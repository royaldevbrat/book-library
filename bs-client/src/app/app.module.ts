import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/guard/auth.guard';
import { ValidateService } from './services/validate.service';
import { ToastModule, ToastOptions } from 'ng2-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoadingModule,ANIMATION_TYPES } from 'ngx-loading';

// import { CollapsibleModule } from 'angular2-collapsible';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        AppRoutingModule,
        // CollapsibleModule,
        // LoadingModule.forRoot({
        //     animationType: ANIMATION_TYPES.wanderingCubes,
        //     backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
        //     backdropBorderRadius: '4px',
        //     primaryColour: '#ffffff', 
        //     secondaryColour: '#ffffff', 
        //     tertiaryColour: '#ffffff'
        // }),
        
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ToastModule.forRoot()
    ],
    providers: [AuthService,HttpClientModule, AuthGuard, ValidateService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
