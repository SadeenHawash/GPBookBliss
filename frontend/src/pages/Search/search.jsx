import { searchBooksAPI } from '@/APIServices/Books/booksAPI';
import PrivateNavbar from '@/components/Navbar/PrivateNavbar/PrivateNavbar'
import SearchPageBody from '@/components/Search/SearchPageBody'
import React, {useState} from 'react'

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

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
            <PrivateNavbar onSearch={handleSearch} setSearchQuery={setSearchQuery} />
            <SearchPageBody searchResults={searchResults} />
        </div>
    );
}

export default Search