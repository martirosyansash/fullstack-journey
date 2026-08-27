
function SearchFilter({ setFilter,search, setSearch }) {
    return (
        <div className="search-filter">
            <input
                type="text"
                value={search}
                onChange={(event) => {setSearch(event.target.value)}}
                placeholder="Search tasks..."
            />
            <select onChange={(event) => { setFilter(event.target.value)}}>
                <option value="all" >All</option>
                <option value="active" >Active</option>
                <option value="completed" >Completed</option>
            </select>
      </div>
    )
}
export default SearchFilter;