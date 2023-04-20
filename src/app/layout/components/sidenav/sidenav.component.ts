import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  items = [
    { url: 'dropName', text: 'Drop Name' },
    { url: 'mousePressedAndCreate', text: 'Mouse Pressed and Create' },
    { url: 'firework', text: 'Firework' },
  ];
}
