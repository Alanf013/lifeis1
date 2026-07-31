/** Store mínimo (sem libs) para compartilhar o progresso da seção de pilares. */
export type PillarProgressState = {
  /** seção de pilares está no viewport */
  inSection: boolean;
  /** índice do pilar ativo (0-5) */
  active: number;
  /** total de pilares */
  total: number;
};

let state: PillarProgressState = { inSection: false, active: 0, total: 6 };
const listeners = new Set<() => void>();

export function setPillarProgress(next: Partial<PillarProgressState>) {
  const merged = { ...state, ...next };
  if (
    merged.inSection === state.inSection &&
    merged.active === state.active &&
    merged.total === state.total
  )
    return;
  state = merged;
  listeners.forEach((l) => l());
}

export function subscribePillarProgress(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getPillarProgress() {
  return state;
}
