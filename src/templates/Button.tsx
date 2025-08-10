import { Tailwind, pixelBasedPreset, Button as ButtonComponent } from '@react-email/components';
import { type ReactNode } from 'react';

export const Button = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: {
              brand: '#007291',
            },
          },
        },
      }}
    >
      <ButtonComponent href={href} className="bg-brand px-3 py-2 font-medium leading-4 text-white rounded-[8px]">
        {children}
      </ButtonComponent>
    </Tailwind>
  );
};
