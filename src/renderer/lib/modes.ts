import type { SetStateAction } from 'react';
import type { IslandMode } from '../../shared/contracts';

export function modeReducer(mode: IslandMode, action: SetStateAction<IslandMode>): IslandMode {
  return typeof action === 'function' ? action(mode) : action;
}
export function resolveMode(mode: IslandMode, standby: boolean, largeStandby: boolean): IslandMode {
  return mode !== 'still' ? mode : standby ? 'quick' : largeStandby ? 'large' : 'still';
}

/** Hover opens quick view. Idle time and battery do not open the full page. */
export function hoverMode(mode: IslandMode): IslandMode {
  return mode === 'large' ? mode : 'quick';
}

/** Full pages and an already-open quick view scale. A hover that grows out of still does not. */
export function hoverScale(hovered: boolean, mode: IslandMode, quickStandby: boolean): number {
  return hovered && (mode === 'large' || quickStandby) ? 1.05 : 1;
}

export function enterAlertMode(mode: IslandMode): IslandMode {
  return mode === 'large' ? mode : 'quick';
}

export function leaveAlertMode(mode: IslandMode): IslandMode {
  return mode === 'quick' ? 'still' : mode;
}
