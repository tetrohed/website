import { App } from './App';
import { RouteEntryList, router } from './router';
import { ComingSoon } from './ComingSoon';
import { Home } from './Home';
import { Navigation, NavigationItem } from './Navigation';
import { NodeComponent, Node } from '@arminjazi/dom';

export const MainRoute: NodeComponent = (): Node => {
  const content: Node = <div data-testid="content" />;

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

  const { setRoute } = router(content.element, routes);

  const handleClick = (navItem: NavigationItem) => {
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
      <Navigation onClick={handleClick}/>
      {content.element}
    </div>
  );
};
