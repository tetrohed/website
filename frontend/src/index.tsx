import { MainRoute } from './MainRoute';
import { render } from './render';

const main = <MainRoute />;

document.body.appendChild(render(main));
