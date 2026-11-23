import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// TODO: replace placeholder copy with the exact text from the three Figma frames (15:2, 15:30, 15:58).
const slides = [
  { title: 'Plan your day', text: 'Organise your priorities and focus on what matters most.' },
  { title: 'Work in focused blocks', text: 'Pick one task, finish it, then move to the next.' },
  { title: 'Review your progress', text: 'Check what is completed and plan what comes next.' },
];
export default function FocusNotes() {
  const [i, setI] = useState(0);
  const go = n => setI((n + slides.length) % slides.length);
  const s = slides[i];
  return (
    <section className="card notes" aria-roledescription="carousel" aria-label="Focus Notes">
      <div aria-live="polite">
        <p className="muted">Focus Notes · {i + 1} of {slides.length}</p>
        <h2>{s.title}</h2><p>{s.text}</p>
      </div>
      <div className="notes-ctrl">
        <button className="btn" onClick={() => go(i - 1)} aria-label="Previous slide"><ChevronLeft size={18} />Previous</button>
        <div className="dots">{slides.map((_, n) => (
          <button key={n} className={n === i ? 'dot on' : 'dot'} onClick={() => go(n)} aria-label={`Go to slide ${n + 1}`} aria-current={n === i} />))}</div>
        <button className="btn" onClick={() => go(i + 1)} aria-label="Next slide">Next<ChevronRight size={18} /></button>
      </div>
    </section>
  );
}
