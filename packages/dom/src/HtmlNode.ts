import { Node } from './Node';

export default class HtmlNode implements Node {
  constructor(
    tag: keyof JSX.IntrinsicElements,
    fragments: DocumentFragment,
    attributes: JSX.AttributeMap
  ) {
    this.element = document.createElement(tag);
    this.element.appendChild(fragments);
    if (attributes) this.addAttributes(this.element, attributes);
  }

  private addAttributes(element: HTMLElement, attributes: JSX.AttributeMap) {
    const keys = Object.keys(attributes);
    keys.forEach((key) => {
      const k = key as JSX.AttributeKey;
      if (typeof attributes[k] === 'function') {
        element.addEventListener(k, attributes[k]);
      } else element.setAttribute(k, attributes[k]);
    });
  }

  readonly element: HTMLElement;
}
