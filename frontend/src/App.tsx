import './app.css';

import { NodeComponent, Node } from '@arminjazi/dom';

export const App: NodeComponent = (): Node => {
  return (
    <div class="app" data-testid="app">
      <p> Armin G Jazi </p>
    </div>
  );
};
