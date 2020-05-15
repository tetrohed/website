import { State, View, ViewComponent } from '@arminjazi/dom';

export interface RouteEntry {
  goTo: View;
  path: string;
}
export type RouteEntryList = Array<RouteEntry>;

type Props = {
  routeState: State<RouteEntry>;
};

export const Router: ViewComponent<Props> = (
  { routeState }: Props,
  listener
): View => {
  routeState.addListener(listener);
  return routeState.get().goTo;
};
