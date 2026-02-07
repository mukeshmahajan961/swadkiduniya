import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent {
  private fb = inject(FormBuilder);
  modalService = inject(ModalService);

  signupForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Signup form submitted:', this.signupForm.value);
      this.modalService.close();
    }
  }

  switchToLogin() {
    this.modalService.open('login');
  }
}
