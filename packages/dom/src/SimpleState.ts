import { State, StateListener } from './State';

export default class SimpleState<T> implements State<T> {
  constructor(initial: T) {
    this.state_ = initial;
    this.listener_ = [];
  }

  public addListener(listener: StateListener): void {
    this.listener_.push(listener);
  }

  public removeListener(listener: StateListener): void {
    const index = this.listener_.indexOf(listener);
    if (index > -1) {
      this.listener_.splice(index, 1);
    }
  }

  public set(to: T): void {
    this.state_ = to;
    this.listener_.forEach((l) => l.update());
  }

  public get(): T {
    return this.state_;
  }

  private state_: T;

  private listener_: StateListener[];
}
