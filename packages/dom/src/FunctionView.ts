import { View, ViewComponent } from './View';
import { State, StateListener } from './State';
import Children from './Children';

export default class FunctionView implements View, StateListener {
  constructor(
    view: ViewComponent,
    children: Children,
    attributes: JSX.IntrinsicPropTypes,
    states: State[]
  ) {
    this.attributes_ = attributes;
    this.tag_ = view;
    this.children_ = children;
    this.states_ = states;
    this.self_ = this;
  }

  update(): void {
    if (!this.element_ || !this.element_.parentNode) return;

    const newElement = this.tag_(
      {
        states: this.states_,
        ...this.attributes_,
      },
      this.self_
    ).render();

    this.element_.parentNode.replaceChild(newElement, this.element_);
    this.element_ = newElement;
    this.element_.appendChild(this.children_.asDocumentFragment());
  }

  render(): Element {
    this.element_ = this.tag_(
      {
        states: this.states_,
        ...this.attributes_,
      },
      this.self_
    ).render();
    this.element_.appendChild(this.children_.asDocumentFragment());
    return this.element_;
  }

  private readonly tag_: ViewComponent;

  private element_?: Element;

  private readonly attributes_?: JSX.IntrinsicPropTypes;

  private readonly children_: Children;

  private readonly states_: State[];

  private readonly self_: FunctionView;
}