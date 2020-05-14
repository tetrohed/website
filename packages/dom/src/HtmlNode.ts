import { Node } from './Node';
import { StateListener } from './State';
import Children from './Children';

export default class HtmlNode implements Node, StateListener {
  constructor(
    tag: keyof JSX.IntrinsicElements,
    children: Children,
    attributes: JSX.AttributeMap
  ) {
    this.tag_ = tag;
    this.children_ = children;
    this.attributes_ = attributes;
  }

  update(): void {
    this.element_ = document.createElement(this.tag_);
    this.element_.appendChild(this.children_.asDocumentFragment());

    if (this.attributes_) {
      this.addAttributes(this.element_, this.attributes_);
    }
  }

  render(): Element {
    this.update();
    return this.element_!;
  }

  private addAttributes(element: Element, attributes: JSX.AttributeMap) {
    const keys = Object.keys(attributes);
    keys.forEach((key) => {
      const k = key as JSX.AttributeKey;
      if (typeof attributes[k] === 'function') {
        element.addEventListener(k, attributes[k]);
      } else element.setAttribute(k, attributes[k]);
    });
  }

  private readonly attributes_?: JSX.AttributeMap;
  private readonly tag_: keyof JSX.IntrinsicElements;
  private readonly children_: Children;
  private element_?: Element;
}
