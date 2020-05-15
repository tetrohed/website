import { State, StateListener } from './State';

export interface View {
  render(): Element;
}

export interface ViewComponent<Props = { states?: State[] }> {
  (props: Props, listener: StateListener): View;
}
