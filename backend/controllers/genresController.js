import Genre from "../models/genreModel.js"

export const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single genre by ID
export const getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.genreId);
        if (genre) {
        res.json(genre);
        } else {
        res.status(404).json({ message: "Genre not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new genre
export const createGenre = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required' });
    }
    
    if (await Genre.findOne({ name: name })) {
        return res.status(400).json({ message: 'Genre already exists' });
    }

    const genre = new Genre({
        name,
        description,
    });

    try {
        const newGenre = await genre.save();
        res.status(201).json(newGenre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing genre
export const updateGenre = async (req, res) => {
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(
        req.params.genreId,
        req.body,
        { new: true }
        );
        res.json(updatedGenre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a genre
export const deleteGenre = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.genreId);
        if (!genre) {
        return res.status(404).json({ message: "Genre not found" });
        }
        const genreDeleted = await Genre.findByIdAndDelete(req.params.genreId);
        if(!genreDeleted){
            throw new Error("Genre cannot be deleted.")
        }
        res.json({ message: "Genre deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};