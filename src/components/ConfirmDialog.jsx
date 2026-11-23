import { useEffect } from 'react';
export default function ConfirmDialog({ task, onConfirm, onCancel }) {
  useEffect(() => {
    const k = e => e.key === 'Escape' && onCancel();
    document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k);
  }, [onCancel]);
  return (
    <div className="overlay"><div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="cd">
      <h2 id="cd">Delete task?</h2>
      <p>“{task.title}” will be removed permanently.</p>
      <div className="actions"><button className="btn" autoFocus onClick={onCancel}>Cancel</button>
        <button className="btn danger-solid" onClick={onConfirm}>Delete</button></div>
    </div></div>
  );
}
