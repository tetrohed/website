import { NodeComponent, Node } from '@arminjazi/dom';

export type Props = {
  textContent: string;
};
export const Button: NodeComponent<Props> = ({ textContent }: Props): Node => {
  return (
    <div data-testid="button" class="app-button mdc-button mdc-button--raised">
      <span class="mdc-button__label">{textContent}</span>
    </div>
  );
};
