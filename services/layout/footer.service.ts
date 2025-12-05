import React from 'react';

export interface FooterAnimationState {
  progress: React.RefObject<number>;
  x: React.RefObject<number>;
  reqId: React.RefObject<number | null>;
  time: React.RefObject<number>;
  svgRef: React.RefObject<SVGSVGElement | null>;
  pathRef: React.RefObject<SVGPathElement | null>;
}

export const lerp = (x: number, y: number, a: number): number => {
  return x * (1 - a) + y * a;
};

export const setPath = (state: FooterAnimationState, value: number, x: number): void => {
  if (!state.pathRef.current) return;
  const { width } = state.svgRef.current?.getBoundingClientRect() ?? { width: 0 };
  state.pathRef.current.setAttribute('d', `M 0 50 Q ${width * x} ${50 + value} ${width} 50`);
};

export const animateIn = (state: FooterAnimationState): void => {
  if (state.reqId.current !== null) {
    cancelAnimationFrame(state.reqId.current);
    state.time.current = Math.PI / 2;
  }
  setPath(state, state.progress.current, state.x.current);
  state.reqId.current = requestAnimationFrame(() => animateIn(state));
};

export const animateOut = (state: FooterAnimationState): void => {
  const newProgress = state.progress.current * Math.sin(state.time.current);
  setPath(state, newProgress, state.x.current);
  state.progress.current = lerp(state.progress.current, 0, 0.04);
  state.time.current += 0.2;

  if (Math.abs(state.progress.current) > 0.5) {
    if (state.reqId.current !== null) {
      state.reqId.current = requestAnimationFrame(() => animateOut(state));
    }
  } else {
    state.time.current = Math.PI / 2;
    state.progress.current = 0;
  }
};

export const manageMouseMove = (
  e: React.MouseEvent<HTMLSpanElement>,
  state: FooterAnimationState,
): void => {
  const { movementY } = e;
  const box = e.currentTarget.getBoundingClientRect();
  state.x.current = (e.clientX - box.left) / box.width;
  state.progress.current += movementY;
};

export const resetAnimation = (state: FooterAnimationState): void => {
  if (state.reqId.current !== null) {
    cancelAnimationFrame(state.reqId.current);
  }
  animateOut(state);
};

export const initializePath = (state: FooterAnimationState): (() => void) => {
  setPath(state, state.progress.current, state.x.current);

  const handleResize = () => {
    setPath(state, state.progress.current, state.x.current);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    if (state.reqId.current !== null) {
      cancelAnimationFrame(state.reqId.current);
    }
  };
};
