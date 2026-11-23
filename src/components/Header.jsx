import { Menu, Plus } from 'lucide-react';
export default function Header({ onMenu, onAdd }) {
  return (
    <header className="topbar">
      <button className="icon-btn menu-open" onClick={onMenu} aria-label="Open menu"><Menu size={22} /></button>
      <div><h1>Dashboard</h1><p className="muted">Your tasks at a glance</p></div>
      <button className="btn primary" onClick={onAdd}><Plus size={18} aria-hidden="true" />Add task</button>
    </header>
  );
}
