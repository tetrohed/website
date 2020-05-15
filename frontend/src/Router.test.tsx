import { queryByTestId } from '@testing-library/dom';
import { ViewComponent, View, SimpleState } from '@arminjazi/dom';

import { render } from './render';
import { RouteEntryList, Router } from './Router';

const Info: ViewComponent = (): View => {
  return <div data-testid="info" />;
};

const About: ViewComponent = (): View => {
  return <div data-testid="about" />;
};

const Root: ViewComponent = (): View => {
  return <div data-testid="root" />;
};

const routes: RouteEntryList = [
  {
    goTo: <Info />,
    path: '/about',
  },
  {
    goTo: <About />,
    path: '/info',
  },
  {
    goTo: <Root />,
    path: '/',
  },
];

describe('<Router />', () => {
  it('routes to root url initially', () => {
    const routeState = new SimpleState(routes[2]);

    const container = render(<Router routeState={routeState} />);

    expect(queryByTestId(container, 'root')).toBeTruthy();
    expect(queryByTestId(container, 'info')).toBeFalsy();
    expect(queryByTestId(container, 'about')).toBeFalsy();
  });

  it('routes to about page', () => {
    const routeState = new SimpleState(routes[2]);
    const router = <Router routeState={routeState} />;
    const container = render(router);

    routeState.set(routes[1]);

    expect(queryByTestId(container, 'root')).toBeFalsy();
    expect(queryByTestId(container, 'about')).toBeTruthy();
    expect(queryByTestId(container, 'info')).toBeFalsy();
  });
});
