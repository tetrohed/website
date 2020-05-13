import { NodeComponent, Node } from '@arminjazi/dom';
import { Button } from './Button';

export enum NavigationItem {
  Home = 'Home',
  App = 'App',
  ComingSoon = 'ComingSoon',
}

type Props = {
  onClick: (navigationItem: NavigationItem) => void;
};

export const Navigation: NodeComponent<Props> = ({ onClick }): Node => {
  return (
    <div data-testid="navigation" class="root">
      <Button
        textContent="App"
        onClick={() => onClick(NavigationItem.App)}
      />
      <Button
        textContent="Coming Soon"
        onClick={() => onClick(NavigationItem.ComingSoon)}
      />
      <Button
        textContent="Home"
        onClick={() => onClick(NavigationItem.Home)}
      />
    </div>
  );
};
