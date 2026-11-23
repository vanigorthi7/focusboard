import TaskCard from './TaskCard';
export default function TaskList({ tasks, total, ...handlers }) {
  if (!tasks.length) return <p className="card empty">{total ? 'No tasks match your search or filters.' : 'No tasks yet. Add your first task.'}</p>;
  return <ul className="list">{tasks.map(t => <TaskCard key={t.id} task={t} {...handlers} />)}</ul>;
}
