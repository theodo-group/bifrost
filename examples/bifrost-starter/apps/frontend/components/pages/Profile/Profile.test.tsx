import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Profile } from './Profile';

describe('<Profile />', () => {
  it('should have no basic accessibility issues', async () => {
    const { container } = render(<Profile />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
