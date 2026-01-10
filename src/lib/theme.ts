// Helper function to get CSS variable value
export function getCSSVar(name: string): string {
  return `var(${name})`;
}

// Theme color constants
export const BG_PRIMARY = getCSSVar("--bg-primary");
export const BG_SECONDARY = getCSSVar("--bg-secondary");
export const BG_TERTIARY = getCSSVar("--bg-tertiary");
export const BG_MODAL_BACKDROP = getCSSVar("--bg-modal-backdrop");
export const TEXT_PRIMARY = getCSSVar("--text-primary");
export const TEXT_SECONDARY = getCSSVar("--text-secondary");
export const TEXT_TERTIARY = getCSSVar("--text-tertiary");
export const BORDER_COLOR = getCSSVar("--border-color");
