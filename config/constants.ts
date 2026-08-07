import { routes } from './routes';

export const imageSources = {
  classifiedPlaceholder:
    'https://apex-motors.s3.eu-north-1.amazonaws.com/uploads/classified-placeholder.jpeg',
};

export const CLASSIFIEDS_PER_PAGE = 9;

export const navLinks = [
  { id: 1, href: routes.home, label: 'Home' },
  { id: 2, href: routes.inventory, label: 'Inventory' },
  // {id: 3, href: routes.home, label: 'Home'},
  // {id: 4, href: routes.home, label: 'Home'},
];
