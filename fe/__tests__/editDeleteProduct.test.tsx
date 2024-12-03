import '@testing-library/jest-dom';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import Page from '@/app/dashboard/products/detail/[id]/page';
import userEvent from '@testing-library/user-event';
import initServer from './editDeleteProduct.setup.test';

describe('Update & delete Page', () => {
  initServer();

  afterAll(() => {
    cleanup();
  });

  it('Update Product', async () => {
    render(<Page params={{ id: '5' }} />);

    const loadingEl = await screen.findByTestId('loading');

    expect(loadingEl).toBeVisible();

    await waitFor(() => expect(loadingEl).not.toBeVisible());

    const nameInput = (await screen.findByTestId('name-input')) as HTMLInputElement;
    const priceInput = (await screen.findByTestId('price-input')) as HTMLInputElement;
    const typeSelect = (await screen.findByTestId('type-select')) as HTMLInputElement;
    const stockInput = (await screen.findByTestId('stock-input')) as HTMLInputElement;
    const yearInput = (await screen.findByTestId('year-input')) as HTMLInputElement;

    expect(nameInput.value).toBe('AAA');

    await userEvent.type(nameInput, 'mazda');
    await userEvent.type(priceInput, '2000');

    await userEvent.type(typeSelect, 'second');
    await userEvent.type(stockInput, '1000');
    await userEvent.type(yearInput, '2019');

    const submitButton = screen.getByTestId('submit-btn');

    await userEvent.click(submitButton);

    const loadingEl1 = await screen.findByTestId('loading');

    await waitFor(() => expect(loadingEl1).toBeVisible());

    await waitFor(() => expect(loadingEl1).not.toBeVisible());
  });
  it('Delete Product', async () => {
    render(<Page params={{ id: '5' }} />);

    const deleteBtn = screen.getByTestId('delete-btn');
    userEvent.click(deleteBtn);

    const loadingEl = await screen.findByTestId('loading');

    expect(loadingEl).toBeVisible();

    await waitFor(() => expect(loadingEl).not.toBeVisible());
  });
});
