import type { DistrictCard, Envelope, Overview } from './types';
import type { ScopeResult, Summary } from '../lib/scope';
import type { GaaResult, GaaYearTotal } from '../lib/gaa';

export interface PreparedScope extends ScopeResult { summary: Summary }
export interface PreparedPortal {
  overview: Envelope<Overview>;
  scope: PreparedScope;
  districts: Envelope<DistrictCard>[];
}
export interface PreparedGaa extends GaaResult { yearTotals: GaaYearTotal[] }
