// TODO fails on refresh

import { Node as DomNode } from '@arminjazi/dom';

export interface RouteEntry {
  goTo: DomNode;
  path: string;
}
export  type RouteEntryList = Array<RouteEntry>;

export type RouteState = {current: RouteEntry, setRoute: (route: RouteEntry) => void}

export const router = (content: Element, routes: RouteEntryList): RouteState => {
  content.appendChild(routes[0].goTo.element);

  let current = routes[0];

  const setRoute = (route: RouteEntry): void => {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path
    );

    content.replaceChild(route.goTo.element, content.children[0]);
    current = route;
  };

  window.onpopstate = (): void => {
    const path = routes.find((r) => r.path === window.location.pathname);
    if (path) content.replaceChild(path.goTo.element, content.children[0]);
  };

  return {current, setRoute};
};
