import { searchBooksAPI } from '@/APIServices/Books/booksAPI';
import React, { useState } from 'react'; // Adjust path as per your project structure

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            setLoading(true);
            const results = await searchBooksAPI({ search: searchQuery });
            setSearchResults(results);
        } catch (error) {
            setError('Error searching books. Please try again later.');
            console.error('Error searching books:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
            />
            <button onClick={handleSearch} disabled={loading}>
                Search
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {searchResults.map((book) => (
                    <li key={book._id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
