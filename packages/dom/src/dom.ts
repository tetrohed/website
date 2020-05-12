import FunctionalNode from './FunctionalNode';
import HtmlNode from './HtmlNode';
import { NodeComponent, Node } from './Node';

type Tag = keyof JSX.IntrinsicElements | NodeComponent;

const appendChildren = (children: any[]) => {
  const fragments = document.createDocumentFragment();

  children.forEach((child) => {
    if (child instanceof HTMLElement) {
      fragments.appendChild(child);
    } else if (
      typeof child === 'string' ||
      typeof child === 'number' ||
      typeof child === 'boolean'
    ) {
      fragments.appendChild(document.createTextNode(child.toString()));
    } else if (child instanceof HtmlNode) {
      fragments.appendChild(child.element);
    } else if (child instanceof Array) {
      const childrenFragment = appendChildren(child);
      fragments.appendChild(childrenFragment);
    } else if (child instanceof HtmlNode || child instanceof FunctionalNode) {
      fragments.appendChild(child.element);
    } else if (typeof child === 'object') {
      fragments.appendChild(document.createTextNode(JSON.stringify(child)));
    } else {
      throw new Error(
        `not appendable child "${JSON.stringify(
          child
        )}" of type ${typeof child}`
      );
    }
  });

  return fragments;
};

const create = (
  tag: Tag,
  attributes: JSX.AttributeMap,
  ...children: any[]
): Node => {
  const fragments = appendChildren(children);

  if (typeof tag === 'function') {
    return new FunctionalNode(tag, fragments, attributes);
  }
  return new HtmlNode(tag, fragments, attributes);
};

export default { create };
