import SignupClient from './SignupClient';

export const metadata = {
  title: 'Create Account — SMC Journal',
  description: 'Join the elite network of disciplined traders.',
};

import { Suspense } from 'react';

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupClient />
    </Suspense>
  );
}
