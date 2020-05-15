export interface State<T> {
  set(to: T): void;
  get(): T;
  addListener(listener: StateListener): void;
}

export interface StateListener {
  update(): void;
}
