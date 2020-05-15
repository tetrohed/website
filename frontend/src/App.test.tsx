import { getByTestId } from '@testing-library/dom';
import { render } from '@utils/render';

import { App } from './App';

describe('app', function () {
  it('renders without crashing', function () {
    const container = render(<App />);
    expect(getByTestId(container, 'app')).toBeTruthy();
  });
});
