export const home: WebApplication.NodeFunction = (): WebApplication.Node => {
  const element = document.createElement('div');
  element.setAttribute('data-testid', 'home');

  const p = document.createElement('p');

  p.textContent = 'Home';

  element.appendChild(p);

  return { element };
};
