import '@testing-library/jest-dom/extend-expect';

export const render = (element: Element): HTMLElement => {
  const parent = document.createElement('div');
  parent.appendChild(element);
  return parent;
};
