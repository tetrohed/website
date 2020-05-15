import { View, ViewComponent } from '@arminjazi/dom';
import { Button } from './Button';

export enum NavigationItem {
  Home = 'Home',
  App = 'App',
  ComingSoon = 'ComingSoon',
}

type Props = {
  onClick: (navigationItem: NavigationItem) => void;
};

export const Navigation: ViewComponent<Props> = ({ onClick }): View => {
  return (
    <div data-testid="navigation" class="root">
      <Button
        textContent="App"
        onClick={(): void => onClick(NavigationItem.App)}
      />
      <Button
        textContent="Coming Soon"
        onClick={(): void => onClick(NavigationItem.ComingSoon)}
      />
      <Button
        textContent="Home"
        onClick={(): void => onClick(NavigationItem.Home)}
      />
    </div>
  );
};
