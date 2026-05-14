import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 bg-white dark:bg-[#030303] min-h-[calc(100vh-64px)] flex items-center transition-colors">
      <div className="mx-auto max-w-2xl py-20">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
            Version 1.0 is here
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 dark:from-white dark:via-indigo-400 dark:to-white">
            FlowDo: Master Your Day
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A secure, fast, and beautiful task management system designed for peak productivity. 
            Experience the future of personal organization.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={token ? "/dashboard" : "/signup"}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all"
            >
              {token ? "Go to Dashboard" : "Get started for free"}
            </Link>
            {!token && (
              <Link 
                href="/signin" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-center"
              >
                Sign In
              </Link>
            )}
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 text-gray-400 dark:text-gray-500 text-sm font-medium">
            <div>⚡️ Next.js 16</div>
            <div>🔒 Strapi v5</div>
            <div>🎨 Tailwind</div>
          </div>
        </div>
      </div>
    </div>
  );
}
