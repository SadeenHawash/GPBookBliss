import mongoose from "mongoose";

const profanityFilterSchema = mongoose.Schema({
    bannedWords: [String]
});

const ProfanityFilter = mongoose.model("ProfanityFilter", profanityFilterSchema);

module.exports = ProfanityFilter;