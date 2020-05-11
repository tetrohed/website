export const router = (content: Element, routes: RouteEntryList): void => {
  content.appendChild(routes[0].goTo({}).element);

  const onClick = (route: RouteEntry): void => {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path
    );

    content.replaceChild(route.goTo({}).element, content.children[0]);
  };

  window.onpopstate = (): void => {
    const path = routes.find((r) => r.path === window.location.pathname);
    if (path) content.replaceChild(path.goTo({}).element, content.children[0]);
  };

  routes.forEach((r) => r.trigger.addEventListener('click', () => onClick(r)));
};
