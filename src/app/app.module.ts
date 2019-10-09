import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidePanelComponent,
    ListDetailComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
