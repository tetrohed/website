/* global MouseEvent */
import { fireEvent, getByTestId, queryByTestId } from '@testing-library/dom';
import { router } from './router';
import { render } from '../testing/render';

const navItemInfo = document.createElement('div');
navItemInfo.setAttribute('data-testid', 'infoNav');

const navItemAbout = document.createElement('div');
navItemAbout.setAttribute('data-testid', 'aboutNav');

const info = (): WebApplication.Node => {
  const element = document.createElement('div');
  element.setAttribute('data-testid', 'info');
  return {
    element,
  };
};

const about = (): WebApplication.Node => {
  const element = document.createElement('div');
  element.setAttribute('data-testid', 'about');
  return {
    element,
  };
};

const routes: RouteEntryList = [
  {
    trigger: navItemInfo,
    goTo: info,
    path: '/info',
  },
  {
    trigger: navItemAbout,
    goTo: about,
    path: '/about',
  },
];

const content = document.createElement('div');
const root = document.createElement('div');

describe('router', () => {
  beforeEach(() => {
    root.innerHTML = '';
    content.innerHTML = '';
    root.appendChild(navItemAbout);
    root.appendChild(navItemInfo);
    root.appendChild(content);
  });
  it('routes to first item in routes', () => {
    const container = render({ element: root });

    router(content, routes);

    expect(queryByTestId(container, 'info')).toBeTruthy();
    expect(queryByTestId(container, 'about')).toBeFalsy();
  });

  it('routes to about page after clicking on item', () => {
    const container = render({ element: root });

    router(content, routes);

    expect(queryByTestId(container, 'about')).toBeFalsy();
    expect(queryByTestId(container, 'info')).toBeTruthy();

    fireEvent.click(
      getByTestId(container, 'aboutNav'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(queryByTestId(container, 'about')).toBeTruthy();
    expect(queryByTestId(container, 'info')).toBeFalsy();
  });
});
