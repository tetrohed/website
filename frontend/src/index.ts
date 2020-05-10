import { app } from './app';
import { router } from './router';
import { comingSoon } from './comingSoon';
import { home } from './home';
import { button } from './button';

const root = document.createElement('div');
root.className = 'root';

const content = document.createElement('div');

const appNavItem = button({ textContent: 'App' }).element;
const comingSoonNavItem = button({ textContent: 'Coming Soon' }).element;
const homeNavItem = button({ textContent: 'Home' }).element;

root.appendChild(appNavItem);
root.appendChild(comingSoonNavItem);
root.appendChild(homeNavItem);

const routes: RouteEntryList = [
  {
    trigger: homeNavItem,
    goTo: home,
    path: '/',
  },
  {
    trigger: appNavItem,
    goTo: app,
    path: '/app',
  },
  {
    trigger: comingSoonNavItem,
    goTo: comingSoon,
    path: '/comingSoon',
  },
];

router(content, routes);

document.body.appendChild(root);
document.body.appendChild(content);
