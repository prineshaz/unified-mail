import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <p>Welcome to the Home page. This has not been defined, please click on User One or User Two to continue</p>
        <Link href="/admin/123">User One</Link>
        <Link href="/admin/456">User Two</Link>
      </main>
    </div>
  );
}
