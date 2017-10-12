import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeviewModule } from 'ngx-treeview';
import { ProductComponent } from './menu-ia-tree-view/component/product.component';

@NgModule({
  imports: [
    BrowserModule,
    TreeviewModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ProductComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
