import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ModalService } from './services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    LoginFormComponent,
    SignupFormComponent
  ]
})
export class AppComponent {
  modalService = inject(ModalService);
}
