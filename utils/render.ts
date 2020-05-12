import '@testing-library/jest-dom/extend-expect';

export const render = (node: WebApplication.Node): HTMLElement => {
  const parent = document.createElement('div');
  parent.appendChild(node.element);
  return parent;
};
