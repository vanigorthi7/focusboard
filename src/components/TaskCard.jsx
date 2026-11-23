import { Pencil, Trash2, CalendarDays } from 'lucide-react';
import { STATUSES } from '../data/sampleTasks';
const icon = { 'To do': '○', 'In progress': '◐', Completed: '✓' };
export default function TaskCard({ task, onEdit, onDelete, onStatus }) {
  return (
    <li className="card task">
      <div className="task-main">
        <h3>{task.title}</h3>
        {task.description && <p className="muted">{task.description}</p>}
        <p className="meta">
          <span className={`badge s-${task.status.replace(' ', '')}`}>{icon[task.status]} {task.status}</span>
          <span className={`badge p-${task.priority}`}>{task.priority}</span>
          <span className="badge">{task.category}</span>
          <span className="muted due"><CalendarDays size={14} aria-hidden="true" /> {task.dueDate}</span>
        </p>
      </div>
      <div className="task-actions">
        <select value={task.status} onChange={e => onStatus(task.id, e.target.value)} aria-label={`Status for ${task.title}`}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}</select>
        <button className="icon-btn" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={18} /></button>
        <button className="icon-btn danger" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}><Trash2 size={18} /></button>
      </div>
    </li>
  );
}
