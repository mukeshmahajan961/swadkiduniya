import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  services = [
    {
      icon: 'M12 6.253v11.494m-9-5.747h18M12 21.747a9.75 9.75 0 110-19.5 9.75 9.75 0 010 19.5z',
      title: 'Authentic Recipes',
      description: 'Discover a curated collection of traditional recipes passed down through generations, ensuring you get the true taste of India.'
    },
    {
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z; M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Explore by State',
      description: 'Embark on a culinary journey across the country, exploring the unique flavors and culinary traditions of each state with ease.'
    },
    {
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      title: 'Made with Love',
      description: 'Our platform is designed to be intuitive, beautiful, and user-friendly, making your recipe exploration a delightful experience.'
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      title: 'Community Focused',
      description: 'Join a vibrant community of food lovers to share your own recipes, tips, and discover new culinary experiences together.'
    }
  ];
}
