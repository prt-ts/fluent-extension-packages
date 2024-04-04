import { render } from '@testing-library/react';

import FluentInputExtensions from './fluent-input-extensions';

describe('FluentInputExtensions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FluentInputExtensions />);
    expect(baseElement).toBeTruthy();
  });
});
