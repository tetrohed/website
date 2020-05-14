import { NodeComponent, Node } from './Node';
import { State, StateListener } from './State';
import Children from './Children';

export default class FunctionalNode implements Node, StateListener {
  constructor(
    tag: NodeComponent,
    children: Children,
    attributes: JSX.IntrinsicPropTypes,
    states: State[]
  ) {
    this.attributes_ = attributes;
    this.tag_ = tag;
    this.children_ = children;
    this.states_ = states;
    this.states_.forEach((s) => s.addListener(this));
  }

  update(): void {
    this.element_?.replaceWith(
      this.tag_({
        states: this.states_,
        ...this.attributes_,
      }).render()
    );

    this.element_?.appendChild(this.children_.asDocumentFragment());
  }

  render(): Element {
    // TODO duplication
    this.element_ = this.tag_({
      states: this.states_,
      ...this.attributes_,
    }).render();
    this.element_?.appendChild(this.children_.asDocumentFragment());
    return this.element_!;
  }

  private tag_: NodeComponent;
  private element_?: Element;
  private readonly attributes_?: JSX.IntrinsicPropTypes;
  private readonly children_: Children;
  private readonly states_: State[];
}
