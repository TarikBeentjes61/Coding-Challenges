function Error({ message }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] py-10 text-center px-4">
        <div className="bg-red-100 text-red-800 border border-red-300 rounded-lg p-6 w-full max-w-md shadow">
          <h4 className="text-xl font-semibold mb-2">Error</h4>
          <p className="mb-4">{message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
}

export default Error;
