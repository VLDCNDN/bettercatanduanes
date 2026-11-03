import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export default function SourceLink({ href, children = 'Official source', className }: { href: string; children?: ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">
    {children} <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
  </a>;
}
