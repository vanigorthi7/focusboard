import { useState, useMemo } from 'react';
import { ListTodo, Loader, CheckCircle2, Percent } from 'lucide-react';
import useLocalStorage from './hooks/useLocalStorage';
import { sampleTasks } from './data/sampleTasks';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ConfirmDialog from './components/ConfirmDialog';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  const [form, setForm] = useState(null);      // null = closed, 'new' = create, task = edit
  const [toDelete, setToDelete] = useState(null);
  const [menu, setMenu] = useState(false);

  // Derived values: always computed from the single tasks array.
  const total = tasks.length;
  const inProgress = tasks.filter(t => t.status === 'In progress').length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  const visible = useMemo(() => tasks.filter(t =>
    t.title.toLowerCase().includes(query.trim().toLowerCase()) &&
    (status === 'All' || t.status === status) &&
    (priority === 'All' || t.priority === priority)), [tasks, query, status, priority]);

  const save = task => {
    setTasks(ts => ts.some(t => t.id === task.id) ? ts.map(t => t.id === task.id ? task : t) : [task, ...ts]);
    setForm(null);
  };
  const setTaskStatus = (id, s) => setTasks(ts => ts.map(t => t.id === id ? { ...t, status: s } : t));
  const remove = () => { setTasks(ts => ts.filter(t => t.id !== toDelete.id)); setToDelete(null); };
  const reset = () => { setQuery(''); setStatus('All'); setPriority('All'); };

  return (
    <div className="app">
      <Sidebar open={menu} onClose={() => setMenu(false)} />
      <main>
        <Header onMenu={() => setMenu(true)} onAdd={() => setForm('new')} />
        <div className="stats">
          <StatCard title="Total tasks" value={total} icon={ListTodo} />
          <StatCard title="In progress" value={inProgress} icon={Loader} />
          <StatCard title="Completed" value={completed} icon={CheckCircle2} />
          <StatCard title="Completion" value={`${pct}%`} icon={Percent} />
        </div>
        <FocusNotes />
        <section aria-label="Tasks">
          <SearchBar value={query} onChange={setQuery} />
          <FilterTabs status={status} priority={priority} onStatus={setStatus} onPriority={setPriority} onReset={reset} />
          <TaskList tasks={visible} total={total} onEdit={setForm} onDelete={setToDelete} onStatus={setTaskStatus} />
        </section>
      </main>
      {form && <TaskForm task={form === 'new' ? null : form} onSave={save} onCancel={() => setForm(null)} />}
      {toDelete && <ConfirmDialog task={toDelete} onConfirm={remove} onCancel={() => setToDelete(null)} />}
    </div>
  );
}
