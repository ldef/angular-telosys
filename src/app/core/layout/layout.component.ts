import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  menu = [
    { label: 'Accueil', icon: '📊', link: '/' },
    { label: 'Entité 1', icon: '📁', link: '/entity1' },
    { label: 'Entité 2', icon: '⚙️', link: '/entity2' }
  ];
}
