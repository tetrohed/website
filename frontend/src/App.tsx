import './app.css';

import { ViewComponent, View } from '@arminjazi/dom';

export const App: ViewComponent = (): View => {
  return (
    <div class="app" data-testid="app">
      <p> Armin G Jazi </p>
    </div>
  );
};
