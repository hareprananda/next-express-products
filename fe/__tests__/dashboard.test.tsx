import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Page from '@/app/dashboard/page';
import initServer from './dashboard.setup.test';

describe('Dashboard Test', () => {
  initServer();

  afterAll(() => {
    cleanup();
  });

  it('Dashboard Page', async () => {
    render(<Page />);

    const typeChartLoading = screen.getByTestId('typechart-loading');
    const yearChartLoading = screen.getByTestId('yearchart-loading');
    const productListLoading = screen.getByTestId('productList-loading');

    expect(typeChartLoading).toBeVisible();
    expect(yearChartLoading).toBeVisible();
    expect(productListLoading).toBeVisible();

    await waitFor(() => expect(typeChartLoading).not.toBeVisible());
    await waitFor(() => expect(yearChartLoading).not.toBeVisible());
    await waitFor(() => expect(productListLoading).not.toBeVisible());

    // const typeChartData = await screen.findByTestId('typechart-data');
    // const yearChartData = await screen.findByTestId('yearchart-data');
    // const productListData = await screen.findByTestId('productList-data');

    // expect(typeChartData).toBeVisible();
    // expect(yearChartData).toBeVisible();
    // expect(productListData).toBeVisible();
  });
});
