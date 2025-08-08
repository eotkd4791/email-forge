import { render } from '@react-email/render';
import { ComponentType, createElement } from 'react';

type RenderEmailParams = {
  template: ComponentType<any>;
  props: Record<string, unknown>;
  options?: Parameters<typeof render>[1];
};

export function renderEmail({ template, props, options }: RenderEmailParams) {
  return render(createElement(template, props), options);
}
