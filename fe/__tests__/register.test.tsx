import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Page from '@/app/auth/register/page';
import userEvent from '@testing-library/user-event';
import initServer from './register.setup.test';

describe('Register Page', () => {
  initServer();

  afterAll(() => {
    cleanup();
  });

  it('Testing Register', async () => {
    render(<Page />);

    const usernameInput = screen.getByTestId('username-input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId('confirm-password-input') as HTMLInputElement;
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;

    await userEvent.type(usernameInput, 'myusername');
    await userEvent.type(passwordInput, 'mypassword');
    await userEvent.type(emailInput, 'email@mail.com');
    await userEvent.type(confirmPasswordInput, 'mypassword');

    const submitButton = screen.getByTestId('submit-btn');

    await userEvent.click(submitButton);

    const loadingEl = await screen.findByTestId('loading');

    expect(loadingEl).toBeVisible();

    await waitFor(() => expect(loadingEl).not.toBeVisible());

    const successText = await screen.findByTestId('success-text');

    await waitFor(() => expect(successText).toBeVisible());
  });
});
