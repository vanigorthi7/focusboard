import { Search } from 'lucide-react';
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search"><Search size={18} aria-hidden="true" />
      <input type="search" value={value} onChange={e => onChange(e.target.value)} placeholder="Search tasks by title" aria-label="Search tasks by title" /></div>
  );
}
