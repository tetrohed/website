import { App } from './App';
import { ComingSoon } from './ComingSoon';
import { Home } from './Home';
import { Navigation, NavigationItem } from './Navigation';
import { ViewComponent, View, SimpleState } from '@arminjazi/dom';
import { RouteEntryList, Router } from './Router';

export const MainRoute: ViewComponent = (): View => {
  const routes: RouteEntryList = [
    {
      goTo: <Home />,
      path: '/',
    },
    {
      goTo: <App />,
      path: '/app',
    },
    {
      goTo: <ComingSoon />,
      path: '/comingSoon',
    },
  ];

  const routeState = new SimpleState(routes[0]);

  const handleClick = (navItem: NavigationItem): void => {
    switch (navItem) {
      case NavigationItem.App:
        routeState.set(routes[1]);
        break;
      case NavigationItem.ComingSoon:
        routeState.set(routes[2]);
        break;
      case NavigationItem.Home:
        routeState.set(routes[0]);
        break;
    }
  };

  return (
    <div>
      <Navigation onClick={handleClick} />
      <Router routeState={routeState} />
    </div>
  );
};
