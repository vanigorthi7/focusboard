import { useState, useEffect } from 'react';
import { STATUSES, PRIORITIES } from '../data/sampleTasks';
const blank = { title: '', description: '', category: 'Development', status: 'To do', priority: 'Medium', dueDate: '' };
// One form for both create (task = null) and edit (task = existing).
export default function TaskForm({ task, onSave, onCancel }) {
  const [f, setF] = useState(task ?? blank);
  const [err, setErr] = useState({});
  useEffect(() => {
    const k = e => e.key === 'Escape' && onCancel();
    document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k);
  }, [onCancel]);
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const submit = e => {
    e.preventDefault();
    const title = f.title.trim(), errs = {};
    if (!title) errs.title = 'Enter a task title.';
    if (!f.dueDate) errs.dueDate = 'Choose a due date.';
    setErr(errs);
    if (Object.keys(errs).length) return;
    onSave({ ...f, title, description: f.description.trim(), id: task ? task.id : Date.now() });
  };
  return (
    <div className="overlay" onMouseDown={e => e.target === e.currentTarget && onCancel()}>
      <form className="dialog" role="dialog" aria-modal="true" aria-labelledby="ft" onSubmit={submit} noValidate>
        <h2 id="ft">{task ? 'Edit task' : 'Create task'}</h2>
        <label>Title *<input autoFocus value={f.title} onChange={set('title')} aria-invalid={!!err.title} aria-describedby="e1" />
          <span id="e1" className="err" role="alert">{err.title}</span></label>
        <label>Description<textarea rows="3" value={f.description} onChange={set('description')} /></label>
        <div className="row">
          <label>Status *<select value={f.status} onChange={set('status')}>{STATUSES.map(s => <option key={s}>{s}</option>)}</select></label>
          <label>Priority *<select value={f.priority} onChange={set('priority')}>{PRIORITIES.map(s => <option key={s}>{s}</option>)}</select></label>
        </div>
        <div className="row">
          <label>Category<select value={f.category} onChange={set('category')}>{['Design', 'Development', 'Testing', 'Research'].map(s => <option key={s}>{s}</option>)}</select></label>
          <label>Due date *<input type="date" value={f.dueDate} onChange={set('dueDate')} aria-invalid={!!err.dueDate} aria-describedby="e2" />
            <span id="e2" className="err" role="alert">{err.dueDate}</span></label>
        </div>
        <div className="actions"><button type="button" className="btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn primary">{task ? 'Save changes' : 'Create task'}</button></div>
      </form>
    </div>
  );
}
