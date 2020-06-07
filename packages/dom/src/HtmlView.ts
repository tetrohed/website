import { View } from './View';
import Children from './Children';

export default class HtmlView implements View {
  constructor(
    tag: keyof JSX.IntrinsicElements,
    children: Children,
    attributes: JSX.Attribute
  ) {
    this.tag_ = tag;
    this.children_ = children;
    this.attributes_ = attributes;
  }

  render(): Element {
    this.element_ = document.createElement(this.tag_);

    this.element_.appendChild(this.children_.asDocumentFragment());

    if (this.attributes_) {
      this.addAttributes(this.element_, this.attributes_);
    }
    return this.element_;
  }

  private addAttributes(
    element: HTMLElement,
    attributes: JSX.AttributeMap
  ): void {
    const keys = Object.keys(attributes);
    keys.forEach((key) => {
      const k = key as JSX.AttributeKey;
      if (typeof attributes[k] === 'function') {
        element.addEventListener(k, attributes[k]);
      } else element.setAttribute(k, attributes[k]);
    });
  }

  private readonly attributes_?: JSX.Attribute;

  private readonly tag_: keyof JSX.IntrinsicElements;

  private readonly children_: Children;

  private element_?: HTMLElement;
}
