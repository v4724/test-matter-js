import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DropNameComponent } from './feature/drop-name/drop-name.component';
import { LayoutComponent } from './layout/layout.component';
import { MousePressedAndCreateComponent } from './feature/mouse-pressed-and-create/mouse-pressed-and-create.component';
import { FireworkComponent } from './feature/firework/firework.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dropName',
        component: DropNameComponent,
      },
      {
        path: 'mousePressedAndCreate',
        component: MousePressedAndCreateComponent,
      },
      {
        path: 'firework',
        component: FireworkComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
