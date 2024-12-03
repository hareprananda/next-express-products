import { cookies } from 'next/headers';
import { LoginRes } from './req/auth/authmodel';
import serverApiCall from './serverApiCall';

export async function login(user: { username: string; password: string }) {
  const loginCall = await serverApiCall<LoginRes>({
    method: 'POST',
    url: '/auth/login',
    data: user,
    withToken: false
  });

  if (!loginCall.error) {
    // @ts-ignore
    loginCall.data['expires'] = Date.now() + 60 * 60 * 1000;
    cookies().set('session', JSON.stringify(loginCall.data), {
      // @ts-ignore
      expires: new Date(loginCall.data['expires'])
    });
  }
  return loginCall;
}

export async function logout() {
  await serverApiCall({
    method: 'POST',
    url: '/auth/logout'
  });
  cookies().set('session', '', { expires: new Date(0) });
  return 'testing';
}

export function getSession(): LoginRes | null {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return JSON.parse(session);
}
