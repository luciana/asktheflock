const Select = ({ value, handler, children }) => (
  <div className=" mb-3">
    <select
      value={value}
      onChange={(e) => handler(e.target.value)}
      className="form-select block w-full px-4 py-2 font-normal bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-indigo-500 focus:outline-none"
      aria-label="Default select example"
    >
      {children}
    </select>

  </div>
  );
  
  export default Select;