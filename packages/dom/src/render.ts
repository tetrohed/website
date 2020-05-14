import { Node } from './Node';

export const render = (node: Node): HTMLElement => {
  const parent = document.createElement('div');
  parent.appendChild(node.render());
  return parent;
};
