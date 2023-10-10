import { render } from '@testing-library/react';

import FluentReactHookForm from './fluent-react-hook-form';

describe('FluentReactHookForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FluentReactHookForm />);
    expect(baseElement).toBeTruthy();
  });
});
