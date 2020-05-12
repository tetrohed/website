type Tag = keyof JSX.IntrinsicElements | WebApplication.NodeFunction;

class HTMLNode implements WebApplication.Node {
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

class FunctionNode implements WebApplication.Node {
  constructor(
    tag: WebApplication.NodeFunction,
    fragments: DocumentFragment,
    attributes: JSX.IntrinsicPropTypes
  ) {
    this.element = tag(attributes).element;
    this.element.appendChild(fragments);
  }

  readonly element: HTMLElement;
}

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
    } else if (child instanceof HTMLNode) {
      fragments.appendChild(child.element);
    } else if (child instanceof Array) {
      const childrenFragment = appendChildren(child);
      fragments.appendChild(childrenFragment);
    } else if (child instanceof HTMLNode || child instanceof FunctionNode) {
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
): WebApplication.Node => {
  const fragments = appendChildren(children);

  if (typeof tag === 'function') {
    return new FunctionNode(tag, fragments, attributes);
  }
  return new HTMLNode(tag, fragments, attributes);
};

export default { create };
