import { create } from 'zustand';

export interface Slide {
  url: string;
  content: string;
}

interface SlideState {
  slides: Slide[];
  currentSlideIndex: number;
  currentScenarioIndex: number;
  setSlides: (slides: Slide[]) => void;
  setCurrentSlideIndex: (index: number) => void;
  setCurrentScenarioIndex: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  nextScenario: () => void;
}

export const useSlideStore = create<SlideState>((set) => ({
  slides: [],
  currentSlideIndex: 0,
  currentScenarioIndex: 0,
  setSlides: (slides) => set({ slides }),
  setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),
  setCurrentScenarioIndex: (index) => set({ currentScenarioIndex: index }),
  nextSlide: () => set((state) => {
    if (state.slides.length === 0) return state;
    const nextIndex = Math.min(state.currentSlideIndex + 1, state.slides.length - 1);
    return { currentSlideIndex: nextIndex };
  }),
  prevSlide: () => set((state) => {
    if (state.slides.length === 0) return state;
    const prevIndex = Math.max(state.currentSlideIndex - 1, 0);
    return { currentSlideIndex: prevIndex };
  }),
  nextScenario: () => set((state) => {
    // Cycle through scenarios 0-3
    const nextIndex = (state.currentScenarioIndex + 1) % 4;
    return { currentScenarioIndex: nextIndex, currentSlideIndex: 0 };
  }),
}));
