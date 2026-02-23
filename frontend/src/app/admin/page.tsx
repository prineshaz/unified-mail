'use server';

import Link from 'next/link';

export default async function AdminPage() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return (
    <div>
      <h3>Hello</h3>
      <p>You have arrived on Admin section, please login to continue</p>
      <Link href="/admin/123">Go to User Page</Link>
    </div>
  );
}