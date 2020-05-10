import './app.css';

export const app: WebApplication.NodeFunction = (): WebApplication.Node => {
  const element = document.createElement('div');
  element.classList.add('app');

  element.setAttribute('data-testid', 'app');

  const p = document.createElement('p');

  p.textContent = 'Armin G Jazi';

  element.appendChild(p);

  return { element };
};
