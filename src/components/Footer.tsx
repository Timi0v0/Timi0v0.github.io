export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white py-8 dark:border-stone-700 dark:bg-stone-900">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          © {new Date().getFullYear()} 个人网站. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-500 transition-colors hover:text-indigo-500 dark:text-stone-400 dark:hover:text-indigo-400"
          >
            GitHub
          </a>
          <a
            href="mailto:email@example.com"
            className="text-sm text-stone-500 transition-colors hover:text-indigo-500 dark:text-stone-400 dark:hover:text-indigo-400"
          >
            邮件
          </a>
        </div>
      </div>
    </footer>
  );
}
