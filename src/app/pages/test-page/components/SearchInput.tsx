export const SearchInput = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search asset name, symbol, or address"
        className="pl-10 pr-40 py-2 border border-gray-300 rounded bg-white w-full"
      />
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
