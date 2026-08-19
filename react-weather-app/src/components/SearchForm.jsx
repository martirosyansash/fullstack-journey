

function SearchForm({ city, setCity, handleSubmit, loading}){ 
    return (
        <div className="search-action">
            <h1>Weather App</h1>
            <form className="search-form" onSubmit={handleSubmit}>
                <input type="text" value={city} onChange={(evt) => {
                setCity(evt.target.value);
                }}/>
                <button type='submit' disabled={ loading }>{ loading ?  "Searching..." : "Search"}</button>
            </form>
        </div>
    )
}

export default SearchForm;