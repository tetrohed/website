export default <T>(item: T): jest.Mock => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return item as any;
};
