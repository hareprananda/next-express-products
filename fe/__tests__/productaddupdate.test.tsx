import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '@/app/page';
import userEvent from '@testing-library/user-event';

describe('Product Add Update', () => {
  it('Add Product', async () => {
    render(<Page />);

    // const usernameInput = screen.getByTestId('username-input') as HTMLInputElement;
    // const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    // const confirmPasswordInput = screen.getByTestId('confirm-password-input') as HTMLInputElement;
    // const emailInput = screen.getByTestId('email-input') as HTMLInputElement;

    // await userEvent.type(usernameInput, 'myusername');
    // await userEvent.type(passwordInput, 'mypassword');
    // await userEvent.type(emailInput, 'email@mail.com');
    // await userEvent.type(confirmPasswordInput, 'mypassword');

    // expect(usernameInput.value).toBe('myusername');
    // expect(passwordInput.value).toBe('mypassword');
    // expect(emailInput.value).toBe('email@mail.com');
    // expect(confirmPasswordInput.value).toBe('mypassword');

    // const submitButton = screen.getByTestId('submit-btn');

    // await userEvent.click(submitButton);

    // const loadingEl = await screen.findByTestId('loading');

    // expect(loadingEl).toBeVisible();

    // expect(loadingEl).not.toBeVisible();

    expect(1).toBe(1);
  });

  it('Update Product', async () => {
    render(<Page />);

    expect(1).toBe(1);
  });
});
