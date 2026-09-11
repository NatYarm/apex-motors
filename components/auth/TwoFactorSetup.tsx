import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

import { TwoFactorAuth } from './TwoFactorAuth';

export const TwoFactorSetup = ({
  isTwoFactorEnabled,
}: {
  isTwoFactorEnabled: boolean;
}) => {
  return (
    <Card className="max-w-md w-full border">
      <CardHeader className="flex flex-between gap-2">
        <CardTitle>Two-Factor Authentication</CardTitle>
        <Badge variant={isTwoFactorEnabled ? 'default' : 'secondary'}>
          {isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
        </Badge>
      </CardHeader>
      <CardContent>
        <TwoFactorAuth isEnabled={isTwoFactorEnabled} />
      </CardContent>
    </Card>
  );
};
