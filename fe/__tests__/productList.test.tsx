import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Page from '@/app/dashboard/products/page';
import initServer from './productList.setup.test';
import userEvent from '@testing-library/user-event';

describe('Product List Page', () => {
  initServer();

  afterAll(() => {
    cleanup();
  });
  it('Initial render', async () => {
    render(<Page />);

    const loadingEl = await screen.findByTestId('productList-loading');

    await waitFor(() => expect(loadingEl).not.toBeVisible());

    const tableContainer = await screen.findByTestId('data-container');

    const contentLength = (tableContainer.querySelectorAll('tbody > tr') || []).length;

    expect(contentLength).toBeGreaterThan(0);
  });

  it('Pagination', async () => {
    render(<Page />);
    const paginationBtn = await screen.findByTestId('product-pagination');

    const secondBtn = paginationBtn.querySelector("li[title='2']") as Element;

    expect(secondBtn).toBeVisible();

    await userEvent.click(secondBtn);

    const loadingEl = await screen.findByTestId('productList-loading');

    await waitFor(() => expect(loadingEl).not.toBeVisible());

    const tableContainer = await screen.findByTestId('data-container');

    const contentLength = (tableContainer.querySelectorAll('tbody > tr') || []).length;

    expect(contentLength).toBeGreaterThan(0);
  });
});
