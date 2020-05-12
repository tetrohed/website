import { NodeComponent, Node } from './Node';

export default class FunctionalNode implements Node {
  constructor(
    tag: NodeComponent,
    fragments: DocumentFragment,
    attributes: JSX.IntrinsicPropTypes
  ) {
    this.element = tag(attributes).element;
    this.element.appendChild(fragments);
  }

  readonly element: HTMLElement;
}
