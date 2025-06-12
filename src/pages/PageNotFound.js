function PageNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
      <div>
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition"
        >
          Home
        </a>
      </div>
    </div>
  );
}

export default PageNotFound;
