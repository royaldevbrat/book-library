import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BooksRoutingModule } from './books-routing.module'
import { BooksComponent } from './books.component';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule
  ],
  declarations: [BooksComponent, TimeAgoPipe]
})
export class BooksModule { }
