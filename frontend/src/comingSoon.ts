export const comingSoon = (): WebApplication.Node => {
  const element = document.createElement('div');
  element.setAttribute('data-testid', 'comingSoon');

  const p = document.createElement('p');

  p.textContent = 'Coming Soon!';

  element.appendChild(p);

  return { element };
};
