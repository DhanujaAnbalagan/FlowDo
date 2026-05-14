export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 transition-colors">
      <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-full mb-4">
        <svg
          className="w-10 h-10 text-indigo-500 dark:text-indigo-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">No tasks yet</h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-xs">
        Looks like you&apos;re all caught up. Start your day by adding a new task above!
      </p>
    </div>
  );
}
