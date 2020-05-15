import { View } from '@arminjazi/dom';

export const render = (view: View): HTMLElement => {
  const parent = document.createElement('div');
  parent.appendChild(view.render());
  return parent;
};
