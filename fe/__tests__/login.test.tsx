import '@testing-library/jest-dom';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import Page from '@/app/auth/login/page';
import userEvent from '@testing-library/user-event';
import initServer from './login.setup.test';

describe('Login Page', () => {
  initServer();

  afterAll(() => {
    cleanup();
  });

  it('Testing login', async () => {
    render(<Page />);

    const usernameInput = screen.getByTestId('username-input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;

    await userEvent.type(usernameInput, 'myusername');
    await userEvent.type(passwordInput, 'mypassword');

    expect(usernameInput.value).toBe('myusername');
    expect(passwordInput.value).toBe('mypassword');

    const submitButton = screen.getByTestId('submit-btn');

    await userEvent.click(submitButton);

    const loadingEl = await screen.findByTestId('loading');

    expect(loadingEl).toBeVisible();

    await waitFor(() => expect(loadingEl).not.toBeVisible());
  });
});
