import { Suspense } from 'react';
import LoginClient from './LoginClient';

export const metadata = {
  title: 'Login — SMC Journal',
  description: 'Sign in to your SMC Journal account.',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
}
