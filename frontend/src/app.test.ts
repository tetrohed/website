import { getByTestId } from '@testing-library/dom';
import { render } from '../testing/render';

import { app } from './app';

describe('app', function () {
  it('renders without crashing', function () {
    const { element } = app();
    const container = render(element);
    expect(getByTestId(container, 'app')).toBeTruthy();
  });
});
