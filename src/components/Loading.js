import Navigation from './Navigation.js';
function Loading() {
    return (
      <>
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-[200px] py-10 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <p className="text-gray-600 text-lg dark:text-white">Loading, please wait...</p>
      </div>
      </>
    );
}

export default Loading;
