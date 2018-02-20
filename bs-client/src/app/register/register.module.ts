import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
// import { LoadingModule,ANIMATION_TYPES } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    // LoadingModule.forRoot({
    //   animationType: ANIMATION_TYPES.wanderingCubes,
    //   backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
    //   backdropBorderRadius: '4px',
    //   primaryColour: '#ffffff', 
    //   secondaryColour: '#ffffff', 
    //   tertiaryColour: '#ffffff'
    // })
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
