import { app } from './app';
import { router } from './router';
import { comingSoon } from './comingSoon';
import { home } from './home';
import { Root } from './Root';

//TODO
// const content = document.createElement('div');
//
// const routes: RouteEntryList = [
//   {
//     trigger: homeNavItem,
//     goTo: home,
//     path: '/',
//   },
//   {
//     trigger: appNavItem,
//     goTo: app,
//     path: '/app',
//   },
//   {
//     trigger: comingSoonNavItem,
//     goTo: comingSoon,
//     path: '/comingSoon',
//   },
// ];
//
// router(content, routes);

document.body.appendChild(Root({}).element);
// document.body.appendChild(content);
