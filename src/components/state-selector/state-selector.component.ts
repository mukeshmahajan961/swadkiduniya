import { ChangeDetectionStrategy, Component, input, output, signal, computed, ElementRef, viewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateData } from '../../services/recipe.service';

@Component({
  selector: 'app-state-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateSelectorComponent implements AfterViewInit {
  states = input.required<StateData[]>();
  activeState = input.required<StateData>();
  stateSelected = output<StateData>();

  scrollContainer = viewChild.required<ElementRef<HTMLDivElement>>('scrollContainer');
  containerWrapper = viewChild.required<ElementRef<HTMLDivElement>>('containerWrapper');

  scrollOffset = signal(0);
  private maxScroll = signal(0);

  isAtStart = computed(() => this.scrollOffset() >= 0);
  isAtEnd = computed(() => {
    // A small tolerance to account for floating point inaccuracies
    return this.scrollOffset() <= -(this.maxScroll() - 1);
  });

  @HostListener('window:resize')
  onResize() {
    this.calculateMaxScroll();
    // Adjust scroll position if it's now out of bounds
    this.scrollOffset.update(current => Math.max(-(this.maxScroll()), current));
  }

  ngAfterViewInit() {
    // Defer calculation to ensure view is stable and rendered
    Promise.resolve().then(() => this.calculateMaxScroll());
  }

  private calculateMaxScroll() {
      const scrollEl = this.scrollContainer()?.nativeElement;
      const wrapperEl = this.containerWrapper()?.nativeElement;
      if (scrollEl && wrapperEl) {
        const scrollWidth = scrollEl.scrollWidth;
        const wrapperWidth = wrapperEl.clientWidth;
        this.maxScroll.set(Math.max(0, scrollWidth - wrapperWidth));
      }
  }

  selectState(state: StateData) {
    this.stateSelected.emit(state);
  }

  scroll(direction: 'left' | 'right') {
    this.calculateMaxScroll(); // Recalculate in case of recent changes
    const wrapperWidth = this.containerWrapper().nativeElement.clientWidth;
    const scrollAmount = wrapperWidth * 0.8; // Scroll by 80% of visible width

    if (direction === 'right') {
      this.scrollOffset.update(current => Math.max(-(this.maxScroll()), current - scrollAmount));
    } else {
      this.scrollOffset.update(current => Math.min(0, current + scrollAmount));
    }
  }
}
