import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  submitted = signal(false);

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Contact form submitted:', this.contactForm.value);
      this.submitted.set(true);
      this.contactForm.reset();
    }
  }

  // Helper getters for easy access in the template
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }
}
