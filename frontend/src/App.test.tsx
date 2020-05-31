import { getByTestId } from '@testing-library/dom';

import { App } from './App';
import { render } from './render';

describe('app', function () {
  it('renders without crashing', function () {
    const container = render(<App />);
    expect(getByTestId(container, 'app')).toBeTruthy();
  });
});
