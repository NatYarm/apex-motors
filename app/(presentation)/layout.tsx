import { PropsWithChildren } from 'react';

import { PublicLayout } from '../layouts/public-layouts';

export default function PresentationLayout(props: PropsWithChildren) {
  return <PublicLayout>{props.children}</PublicLayout>;
}
