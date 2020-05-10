export type Props = {
  textContent: string;
};
export const button: WebApplication.NodeFunction<Props> = ({
  textContent,
}: Props): WebApplication.Node => {
  const button = document.createElement('button');
  const span = document.createElement('span');
  button.setAttribute('data-testid', 'button');

  button.className = 'app-button mdc-button mdc-button--raised';
  span.className = 'mdc-button__label';

  span.textContent = textContent;

  button.appendChild(span);

  return { element: button };
};
