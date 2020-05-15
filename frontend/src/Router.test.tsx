import { queryByTestId } from '@testing-library/dom';
import { render } from '@utils/render';
import { ViewComponent, View } from '@arminjazi/dom';

export interface RouteEntry {
  goTo: View;
  path: string;
}
export type RouteEntryList = Array<RouteEntry>;

export type RouteState = {
  current: RouteEntry;
  setRoute: (route: RouteEntry) => void;
};

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

type Props = {
  routes: RouteEntryList;
};

const Router: ViewComponent<Props> = ({ routes }: Props): View => {
  const current = routes.find((r) => r.path === '/');

  if (!current) return <div data-testid="default-root" />;

  return current.goTo;
};

describe('router', () => {
  it('routes to default root url initially if no roots provided', () => {
    const container = render(<Router routes={[]} />);

    expect(queryByTestId(container, 'root-default')).toBeTruthy();
  });

  it('routes to root url initially', () => {
    const container = render(<Router routes={routes} />);

    expect(queryByTestId(container, 'root')).toBeTruthy();
    expect(queryByTestId(container, 'info')).toBeFalsy();
    expect(queryByTestId(container, 'about')).toBeFalsy();
  });

  it('routes to about page', () => {
    const router = <Router routes={routes} />;
    const container = render(router);

    expect(queryByTestId(container, 'root')).toBeTruthy();
    expect(queryByTestId(container, 'about')).toBeFalsy();
    expect(queryByTestId(container, 'info')).toBeFalsy();

    console.log(router.state);

    expect(queryByTestId(container, 'root')).toBeFalsy();
    expect(queryByTestId(container, 'about')).toBeTruthy();
    expect(queryByTestId(container, 'info')).toBeFalsy();
  });
});
