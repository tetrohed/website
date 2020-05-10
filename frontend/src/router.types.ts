interface RouteEntry {
  goTo: WebApplication.NodeFunction;
  trigger: Element;
  path: string;
}
type RouteEntryList = Array<RouteEntry>;
