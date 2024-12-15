import ReadingList from '../models/readinglistModel.js';
import Book from '../models/bookModel.js';

export const addBookToList = async (req, res) => {
    const { bookId, listName } = req.body;

    try {
        const userId = req.user._id;
        const readingList = await ReadingList.findOne({ userId });

        if (!readingList) {
            const newReadingList = new ReadingList({
                userId,
                [listName]: [bookId],
            });
            await newReadingList.save();
            return res.status(201).json(newReadingList);
        }

        const isBookInOtherList = ['wantToRead', 'currentlyReading', 'finishedReading']
            .filter(list => list !== listName)
            .some(list => readingList[list].includes(bookId));

        if (isBookInOtherList) {
            return res.status(400).json({ message: 'Book already exists in another list' });
        }

        readingList[listName].push(bookId);
        await readingList.save();
        res.status(200).json(readingList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const moveBookBetweenLists = async (req, res) => {
    const { bookId, toList } = req.body;
    console.log(`Request to move book with ID ${bookId} to ${toList} for user ${req.user._id}`);

    try {
        const userId = req.user._id;
        const readingList = await ReadingList.findOne({ userId });

        if (!readingList) {
            console.log('Reading list not found');
            return res.status(404).json({ message: 'Reading list not found' });
        }

        console.log('Current reading list:', readingList);

        // Find the list containing the book
        let fromList = null;
        for (const list in readingList) {
            if (Array.isArray(readingList[list]) && readingList[list].includes(bookId)) {
                fromList = list;
                break;
            }
        }

        if (!fromList) {
            console.log('Book not in any list');
            return res.status(400).json({ message: 'Book not in any list' });
        }

        if (!readingList[toList]) {
            console.log(`Destination list '${toList}' not found`);
            return res.status(400).json({ message: `Destination list '${toList}' not found` });
        }

        // Remove the book from the source list
        readingList[fromList] = readingList[fromList].filter((id) => id.toString() !== bookId);
        // Add the book to the destination list
        readingList[toList].push(bookId);

        await readingList.save();
        res.status(200).json(readingList);
    } catch (error) {
        console.error('Error moving book between lists:', error);
        res.status(500).json({ message: 'Error moving book between lists', error });
    }
};

export const removeBookFromList = async (req, res) => {
    const { listName, bookId } = req.params;

    try {
        const userId = req.user._id;
        const readingList = await ReadingList.findOne({ userId });

        if (!readingList) {
            return res.status(404).json({ message: 'Reading list not found' });
        }

        readingList[listName] = readingList[listName].filter(id => !id.equals(bookId));
        await readingList.save();
        res.status(200).json(readingList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserReadingList = async (req, res) => {
    //const { userId } = req.params;

    try {
        const userId = req.user._id;
        const readingList = await ReadingList.findOne({ userId }).populate('userId wantToRead currentlyReading finishedReading')

        if (!readingList) {
            return res.status(404).json({ message: 'Reading list not found' });
        }

        res.status(200).json(readingList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const checkBookStatus = async (req, res) => {
    const { bookId } = req.params;

    try {
        const userId = req.user._id;
        const readingList = await ReadingList.findOne({ userId });

        if (!readingList) {
            return res.status(404).json({ message: 'Reading list not found' });
        }

        const status = ['wantToRead', 'currentlyReading', 'finishedReading'].find(list => readingList[list].includes(bookId));
        
        res.status(200).json({ status: status ? status : null });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const checkBookInLists = async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user._id;

    try {
        const readingList = await ReadingList.findOne({ userId });

        if (!readingList) {
            return res.status(404).json({ message: 'Reading list not found' });
        }

        const lists = ['wantToRead', 'currentlyReading', 'finishedReading'];
        for (let list of lists) {
            if (readingList[list].includes(bookId)) {
                return res.status(200).json({ message: `Book found in ${list} list`, list });
            }
        }

        return res.status(404).json({ message: 'Book not found in any list' });
    } catch (error) {
        console.error('Error checking book in lists:', error);
        res.status(500).json({ message: 'Error checking book in lists', error });
    }
};

export const getReadingListBooks = async (req, res) => {
    try {
        const userId = req.user._id;
        const { listName } = req.params;
        const readingList = await ReadingList.findOne({ userId });

        if (!readingList) {
            return res.status(404).json({ message: 'Reading list not found' });
        }
        const books = readingList[listName];
        if (!books) {
            return res.status(404).json({ message: 'Reading list not found' });
        }
        const booksData = await Promise.all(books.map(bookId => Book.findById(bookId)));
        if (!booksData) {
            return res.status(404).json({ message: 'Reading list not found' });
        }
        res.status(200).json(booksData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSimilarBooks = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have user authentication in place
        const { listName } = req.params;
        const readingList = await ReadingList.findOne({ userId });

        if (!readingList) {
            return res.status(404).json({ message: 'Reading list not found' });
        }

        const books = readingList[listName];
        if (!books) {
            return res.status(404).json({ message: 'Reading list not found' });
        }

        const booksData = await Book.find({ _id: { $in: books } });
        //{ author: { $in: booksData.map(book => book.author) } }
        const similarBooks = await Book.find({
            $or: [
                { genre: { $in: booksData.map(book => book.genre) } },
            ],
            _id: { $nin: books } // Exclude books already in the reading list
        }).limit(20); // Limit the number of similar books

        res.status(200).json(similarBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
