import { LayoutDashboard, ListChecks, CalendarDays, Settings, X } from 'lucide-react';
const items = [['Dashboard', LayoutDashboard], ['My tasks', ListChecks], ['Calendar', CalendarDays], ['Settings', Settings]];
export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="brand"><span className="logo">F</span>FocusBoard
        <button className="icon-btn menu-close" onClick={onClose} aria-label="Close menu"><X size={20} /></button></div>
      <nav aria-label="Main">
        {items.map(([label, Icon], i) => (
          <a key={label} href="#" className={i === 0 ? 'active' : ''} aria-current={i === 0 ? 'page' : undefined} onClick={e => { e.preventDefault(); onClose(); }}>
            <Icon size={18} aria-hidden="true" />{label}</a>))}
      </nav>
    </aside>
  );
}
