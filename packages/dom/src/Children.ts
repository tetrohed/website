import HtmlNode from './HtmlNode';
import FunctionalNode from './FunctionalNode';

export type ChildrenTypes =
  | HTMLElement
  | Array<ChildrenTypes>
  | HtmlNode
  | FunctionalNode
  | string
  | number
  | boolean;

export default class Children {
  constructor(children: ChildrenTypes[]) {
    this.children_ = children;
  }

  asDocumentFragment = (): DocumentFragment => {
    return this.getFragment(this.children_);
  };

  private getFragment = (children: ChildrenTypes[]): DocumentFragment => {
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
      } else if (child instanceof Array) {
        const children = this.getFragment(child);
        fragments.appendChild(children);
      } else if (child instanceof HtmlNode || child instanceof FunctionalNode) {
        fragments.appendChild(child.render());
      } else if (typeof child === 'object') {
        // TODO this might fail, if the object is not serializable
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

  private readonly children_: ChildrenTypes[];
}
