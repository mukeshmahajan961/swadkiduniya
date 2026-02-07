import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  private modalService = inject(ModalService);
  authService = inject(AuthService);

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  openLogin() {
    this.modalService.open('login');
    this.isMenuOpen.set(false);
  }

  openSignup() {
    this.modalService.open('signup');
    this.isMenuOpen.set(false);
  }

  logout() {
    this.authService.logout();
    this.isMenuOpen.set(false);
  }
}
