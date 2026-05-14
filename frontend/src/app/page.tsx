import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 bg-gray-50 dark:bg-black min-h-[calc(100vh-80px)] transition-colors">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            FlowDo: Master Your Day
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            A secure, fast, and beautiful task management system designed for productivity. 
            Built with Next.js 16 and Strapi v5.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={token ? "/dashboard" : "/signup"}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {token ? "Go to Dashboard" : "Get started"}
            </Link>
            {!token && (
              <Link href="/signin" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
                Sign In <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
