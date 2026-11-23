import { STATUSES, PRIORITIES } from '../data/sampleTasks';
export default function FilterTabs({ status, priority, onStatus, onPriority, onReset }) {
  return (
    <div className="filters">
      <div className="tabs" role="group" aria-label="Filter by status">
        {['All', ...STATUSES].map(s => (
          <button key={s} className={status === s ? 'tab on' : 'tab'} aria-pressed={status === s} onClick={() => onStatus(s)}>{s}</button>))}
      </div>
      <label className="inline">Priority
        <select value={priority} onChange={e => onPriority(e.target.value)}>
          {['All', ...PRIORITIES].map(p => <option key={p}>{p}</option>)}</select></label>
      <button className="btn" onClick={onReset}>Reset filters</button>
    </div>
  );
}
