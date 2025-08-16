import { Body, Container, Html, Tailwind } from '@react-email/components';
import type { PropsWithChildren, ReactNode } from 'react';

interface Props {
  head: ReactNode;
  preview: ReactNode;
}

export const Layout = ({ head, preview, children }: PropsWithChildren<Props>) => (
  <Html>
    {head}
    {preview}
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans px-[10px]">
        <Container className="border border-solid border-[#eaeaea] my-[40px] mx-auto p-[20px] w-full max-w-[465px]">
          {children}
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
