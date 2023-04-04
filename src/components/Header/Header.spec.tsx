import { render } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  it('should render title', () => {
    const { getByTestId } = render(<Header title="Todo" />);

    const title = getByTestId('divider');

    expect(title).toBeInTheDocument();
  });
});
