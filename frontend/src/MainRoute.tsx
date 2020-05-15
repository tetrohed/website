import { App } from './App';
import { ComingSoon } from './ComingSoon';
import { Home } from './Home';
import { Navigation, NavigationItem } from './Navigation';
import { ViewComponent, View } from '@arminjazi/dom';
import { RouteEntryList } from './Router.test';

export const MainRoute: ViewComponent = (): View => {
  const content: View = <div data-testid="content" />;

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

  const { setRoute } = router(content.render(), routes);

  const handleClick = (navItem: NavigationItem): void => {
    switch (navItem) {
      case NavigationItem.App:
        setRoute(routes[1]);
        break;
      case NavigationItem.ComingSoon:
        setRoute(routes[2]);
        break;
      case NavigationItem.Home:
        setRoute(routes[0]);
        break;
    }
  };

  return (
    <div>
      <Navigation onClick={handleClick} />
      {content.render()}
    </div>
  );
};
