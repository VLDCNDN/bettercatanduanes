import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { QueryReport } from '../lib/scope';
import { count, phpFull, plural } from '../lib/format';
import { External, StatusChip } from './Bits';

export default function QueryProjectsDialog({ query, program, onClose }: {
  query: QueryReport;
  program: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const notKept = query.rows.filter((p) => query.region && p.region_key != null && p.region_key !== query.region);
  const rejected = new Set(notKept.map((p) => p.id));
  const kept = query.rows.filter((p) => !rejected.has(p.id));

  useEffect(() => {
    const element = dialog.current!;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog ref={dialog} className="query-dialog" aria-labelledby="query-dialog-title" aria-describedby="query-dialog-summary"
      onClose={() => { if (!dialog.current?.open) onClose(); }} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
          event.currentTarget.close();
        }
      }}>
      <header className="query-dialog-head">
        <div>
          <h2 id="query-dialog-title">{program} · {query.label}</h2>
          <p id="query-dialog-summary">{count(query.total)} found · {count(query.kept)} kept · {count(notKept.length)} not kept</p>
        </div>
        <button type="button" className="button" onClick={() => dialog.current?.close()}>Close</button>
      </header>
      <div className="query-dialog-body">
        {query.region && <p className="query-rule">Kept when the API lists region {query.region} or gives no region. Projects with a different region appear first.</p>}
        {query.truncated && <p role="status" className="query-rule">Only {plural(query.rows.length, 'project')} loaded out of {count(query.total)} found. This list is incomplete.</p>}
        {query.rows.length === 0 ? <p>No projects matched this query.</p> : (
          <ul className="query-projects">
            {[...notKept, ...kept].map((p) => {
              const excluded = rejected.has(p.id);
              return <li key={p.id} className={`query-project${excluded ? ' query-project-rejected' : ''}`}>
                {excluded && <div className="query-rejection">
                  <strong>Not kept</strong>
                  <span>API region {p.region_key}; this search keeps region {query.region} or no region. Check the source classification.</span>
                </div>}
                <div className="query-project-top">
                  <StatusChip group={p.bridge_group} label={p.status_label} held={p.held} />
                  <span className="num" title="House bill amount">{phpFull(p.house_php)} <span className="query-amount-label">House</span></span>
                </div>
                <Link className="project-title" to={`/transparency/projects/${p.dataset}/${encodeURIComponent(p.id)}`} onClick={onClose}>{p.title}</Link>
                <p className="query-project-meta">{program} · {p.region ?? 'No region specified'} · {p.office ?? 'No office specified'}</p>
              </li>;
            })}
          </ul>
        )}
      </div>
      <footer className="query-dialog-foot"><External href={query.api}>View API response</External></footer>
    </dialog>
  );
}
