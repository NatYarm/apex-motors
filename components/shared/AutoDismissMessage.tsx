import { useState } from 'react';

type AutoDismissMessageProps = {
  success: boolean;
  message: string;
};

export const AutoDismissMessage = ({
  success,
  message,
}: AutoDismissMessageProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (!message || dismissed) {
    return null;
  }

  return (
    <p
      onAnimationEnd={() => {
        setDismissed(true);
      }}
      className={
        success
          ? 'text-green-600 text-sm animate-out fade-out duration-300 delay-5000'
          : 'text-destructive text-sm animate-out fade-out duration-300 delay-5000'
      }
    >
      {message}
    </p>
  );
};
