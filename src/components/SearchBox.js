import React from "react";

const SearchBox = ({ setSearchTx, setKeyIdx, keyIdx, handleSearch }) => {
  return (
    <div className="flex my-5 justify-center sticky top-0 z-10">
      <div>
        <div className="input-group">
          <input
            onChange={(e) => setSearchTx(e.target.value)}
            type="text"
            placeholder="Search…"
            className="input input-bordered"
          />
        </div>
      </div>
      <div className="ms-2">
        <div className="form-control rounded-full">
          <div className="input-group rounded-full ">
            <select
              className="select select-bordered"
              defaultValue={keyIdx}
              onChange={(e) => setKeyIdx(e.target.value)}
            >
              <option value={0}>Zero</option>
              <option value={1}>one</option>
              <option value={2}>two</option>
              <option value={3}>three</option>
            </select>
            <button onClick={handleSearch} className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
