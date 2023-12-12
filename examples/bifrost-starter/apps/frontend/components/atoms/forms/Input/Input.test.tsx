import { act, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { EyeClosed } from 'components/atoms/icons/EyeClosed';

import { Input } from './Input';

it.each([
  ['Input', <Input id="basic" key="basic" label="A label" />],
  [
    'Input withEmailType',
    <Input
      id="withEmailType"
      key="withEmailType"
      label="A label"
      type="email"
    />,
  ],
  [
    'Input withIcon',
    <Input id="withIcon" key="withIcon" label="A label" icon={<EyeClosed />} />,
  ],
  [
    'Input withPlaceholder',
    <Input
      id="withPlaceholder"
      key="withPlaceholder"
      label="A label"
      placeholder="Placeholder"
    />,
  ],
  [
    'Input withPlaceholderAndDefaultValue',
    <Input
      id="withPlaceholderAndDefaultValue"
      key="withPlaceholderAndDefaultValue"
      label="A label"
      placeholder="Placeholder"
      defaultValue="Default value"
    />,
  ],
  [
    'Input withDisabled',
    <Input
      id="withDisabled"
      key="withDisabled"
      label="A label"
      disabled
      placeholder="Placeholder"
    />,
  ],
  [
    'Input withDisabledAndDefaultValue',
    <Input
      id="withDisabledAndDefaultValue"
      key="withDisabledAndDefaultValue"
      label="A label"
      disabled
      defaultValue="Default value"
    />,
  ],
])(
  '%s should not have any basic accessibility issues',
  async (name, Component) => {
    const { container } = render(Component);

    await act(async () => {
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  },
);
