import { render } from '@testing-library/react';

import ReactControlFlow from './react-control-flow';

describe('ReactControlFlow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactControlFlow />);
    expect(baseElement).toBeTruthy();
  });
});
