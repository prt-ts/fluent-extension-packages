import { render } from '@testing-library/react';

import SpfxCore from './spfx-core';

describe('SpfxCore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpfxCore />);
    expect(baseElement).toBeTruthy();
  });
});
