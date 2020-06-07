import SimpleState from '../src/SimpleState';

describe('SimpleState', function () {
  it('calls listeners after set', () => {
    const state = new SimpleState(0);
    const stateListener = {
      update: jest.fn(),
    };

    state.addListener(stateListener);

    state.set(10);

    expect(stateListener.update).toHaveBeenCalledTimes(1);
    expect(state.get()).toBe(10);
  });

  it('does not call remove listeners', () => {
    const state = new SimpleState(0);
    const stateListener = {
      update: jest.fn(),
    };

    state.addListener(stateListener);

    state.removeListener(stateListener);

    state.set(10);

    expect(stateListener.update).not.toHaveBeenCalled();
    expect(state.get()).toBe(10);
  });

  it('calls listeners after set for generic class state', () => {
    class TestState {
      constructor(state: number) {
        this.state = state;
      }

      public state = 3;
    }
    const state = new SimpleState(new TestState(3));
    const stateListener = {
      update: jest.fn(),
    };

    state.addListener(stateListener);

    state.removeListener(stateListener);

    state.set(new TestState(10));

    expect(stateListener.update).not.toHaveBeenCalled();
    expect(state.get().state).toBe(10);
  });
});
