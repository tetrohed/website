import { NodeComponent, Node } from '@arminjazi/dom';

export type Props = {
  textContent: string;
  onClick?: () => void;
};
export const Button: NodeComponent<Props> = ({ textContent, onClick }: Props): Node => {
  return (
    <div
      data-testid={`button-${textContent}`}
      class="app-button mdc-button mdc-button--raised"
      click={onClick}
    >
      <span class="mdc-button__label">{textContent}</span>
    </div>
  );
};
