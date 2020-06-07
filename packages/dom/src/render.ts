import { View } from './View';

export const render = (node: View): HTMLElement => {
  const parent = document.createElement('div');
  parent.appendChild(node.render());
  return parent;
};
