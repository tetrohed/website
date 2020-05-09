import './app.css';
import { comingSoon } from './comingSoon';

export const app = (): WebApplication.Node => {
  const element = document.createElement('div');
  element.classList.add('app');

  element.setAttribute('data-testid', 'app');

  const p = document.createElement('p');

  p.textContent = 'Armin G Jazi';

  element.appendChild(p);

  element.appendChild(comingSoon().element);

  return { element };
};
