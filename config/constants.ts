import { routes } from './routes';

export const imageSources = {
  classifiedPlaceholder:
    'https://apex-motors.s3.eu-north-1.amazonaws.com/uploads/classified-placeholder.jpeg',
  carLineup:
    'https://apex-motors.s3.eu-north-1.amazonaws.com/uploads/car-lineup.webp',
  featuresSection:
    'https://apex-motors.s3.eu-north-1.amazonaws.com/uploads/features-section.jpg',
};

export const CLASSIFIEDS_PER_PAGE = 9;

export const navLinks = [
  { id: 1, href: routes.home, label: 'Home' },
  { id: 2, href: routes.inventory, label: 'Inventory' },
];

export const MAX_IMAGE_SIZE = 20 * 1000 * 1000; //2mb
