import { View, ViewComponent } from '@arminjazi/dom';

export type Props = {
  textContent: string;
  onClick?: () => void;
};
export const Button: ViewComponent<Props> = ({
  textContent,
  onClick,
}: Props): View => {
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
