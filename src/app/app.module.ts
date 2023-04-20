import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DropNameComponent } from './feature/drop-name/drop-name.component';
import { LayoutModule } from './layout/layout.module';
import { MousePressedAndCreateComponent } from './feature/mouse-pressed-and-create/mouse-pressed-and-create.component';
import { FireworkComponent } from './feature/firework/firework.component';

@NgModule({
  declarations: [
    AppComponent,
    DropNameComponent,
    MousePressedAndCreateComponent,
    FireworkComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, LayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
