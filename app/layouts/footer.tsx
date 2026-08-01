import { SiInstagram, SiMeta, SiX } from '@icons-pack/react-simple-icons';
import Image from 'next/image';
import Link from 'next/link';

import { NewsletterForm } from '@/components/shared/NewsletterForm';
import { navLinks } from '@/config/constants';
import { routes } from '@/config/routes';
import logoDark from '@/public/footer-dark.png';
import logoLight from '@/public/footer-light.png';

const socialLinks = [
  {
    id: 2,
    href: 'https://instagram.com',
    icon: (
      <SiInstagram className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
    ),
  },
  {
    id: 1,
    href: 'https://facebook.com',
    icon: (
      <SiMeta className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
    ),
  },
  {
    id: 3,
    href: 'https://twitter.com',
    icon: (
      <SiX className="w-4.5 h-4.5 text-muted-foreground hover:text-primary transition-colors" />
    ),
  },
];

export function PublicFooter() {
  return (
    <footer className="bg-accent px-8 lg:px-0 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col space-x-2 gap-y-4">
          <Link href={routes.home} className="flex items-center">
            <Image
              width={100}
              height={100}
              alt="Apex Motors logo light theme"
              src={logoLight}
              className="relative dark:hidden"
              priority
            />
            <Image
              width={100}
              height={100}
              alt="Apex Motors logo dark theme"
              src={logoDark}
              className="relative hidden dark:block"
              priority
            />
          </Link>
          <div className="flex space-x-4">
            {socialLinks.map((link) => {
              return (
                <Link href={link.href} key={link.id}>
                  {link.icon}
                </Link>
              );
            })}
          </div>
        </div>

        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="text-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={routes.signIn}
              className="text-foreground hover:text-primary"
            >
              Admin
            </Link>
          </li>
        </ul>

        <NewsletterForm />
      </div>
      <div className="container mx-auto mt-8 text-center text-gray-700">
        <h4 className="text-lg font-bold text-primary">Company Info</h4>
        <p className="text-sm text-muted-foreground">
          Company No. 123456789 | VAT No. GB123456789
        </p>
        <p className="text-sm text-muted-foreground">
          Apex Motors is not authorised and not regulated by the Financial
          Conduct Authority
        </p>
        <span className="text-xs text-muted-foreground">
          &#169; ApexMotors {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
