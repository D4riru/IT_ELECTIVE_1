export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="search-input"
      />
      {searchTerm && (
        <button 
          onClick={() => onSearchChange('')}
          className="clear-search"
        >
          Clear
        </button>
      )}
    </div>
  )
}