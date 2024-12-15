import express from "express";
import { createGenre, deleteGenre, getAllGenres, getGenreById, updateGenre } from "../../controllers/genresController.js";
import protectRoute from "../../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getAllGenres);
router.get("/:genreId", protectRoute, getGenreById);
router.post("/create", protectRoute, createGenre);
router.put("/:genreId", protectRoute, updateGenre);
router.delete("/:genreId", protectRoute, deleteGenre);

export default router;