import '@testing-library/jest-dom';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import Page from '@/app/dashboard/products/add/page';
import userEvent from '@testing-library/user-event';
import initServer from './addproduct.setup.test';

describe('Add Product Page', () => {
  initServer();

  afterAll(() => {
    cleanup();
  });

  it('Add Product', async () => {
    render(<Page />);

    const nameInput = (await screen.findByTestId('name-input')) as HTMLInputElement;
    const priceInput = (await screen.findByTestId('price-input')) as HTMLInputElement;
    const typeSelect = (await screen.findByTestId('type-select')) as HTMLInputElement;
    const stockInput = (await screen.findByTestId('stock-input')) as HTMLInputElement;
    const yearInput = (await screen.findByTestId('year-input')) as HTMLInputElement;

    await userEvent.type(nameInput, 'mazda');
    await userEvent.type(priceInput, '2000');

    await userEvent.type(typeSelect, 'second');
    await userEvent.type(stockInput, '1000');
    await userEvent.type(yearInput, '2019');

    const submitButton = screen.getByTestId('submit-btn');

    await userEvent.click(submitButton);

    const loadingEl = await screen.findByTestId('loading');

    expect(loadingEl).toBeVisible();

    await waitFor(() => expect(loadingEl).not.toBeVisible());
  });
});
