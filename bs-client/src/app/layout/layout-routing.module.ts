import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
// import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'books', loadChildren: './books/books.module#BooksModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
