import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
// import { LoadingModule,ANIMATION_TYPES } from 'ngx-loading';


@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        // LoadingModule.forRoot({
        //     animationType: ANIMATION_TYPES.wanderingCubes,
        //     backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
        //     backdropBorderRadius: '4px',
        //     primaryColour: '#ffffff', 
        //     secondaryColour: '#ffffff', 
        //     tertiaryColour: '#ffffff'
        //   })
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
