import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  modalService = inject(ModalService);
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      this.authService.login();
      this.modalService.close();
    }
  }

  switchToSignup() {
    this.modalService.open('signup');
  }
}
