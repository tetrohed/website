import { NodeComponent, Node } from '@arminjazi/dom';
import { Button } from './Button';

type Props = {
};
export const Root: NodeComponent<Props> = (): Node => {
  return (
    <div class="root">
      <Button textContent="App"/>
      <Button textContent="Coming Soon"/>
      <Button textContent="Home"/>
    </div>
  );
};
