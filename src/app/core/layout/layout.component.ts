import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  menu = [
    { label: 'Accueil', icon: '📊', link: '/' },
    { label: 'Projets', icon: '📁', link: '/projects' },
    { label: 'Générateurs', icon: '⚙️', link: '/generators' },
    { label: 'Modèles', icon: '👥', link: '/models' },
    { label: 'Rapports', icon: '📈', link: '/reports' },
    { label: 'Intégrations', icon: '🔗', link: '/integrations' }
  ];
}
