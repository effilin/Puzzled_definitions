import mongoose from 'mongoose'

const puzzleSchema = new mongoose.Schema({
    number:  { type: Number, required: true, unique: true},
    riddle: { type: String, required:true},
    answer: { type: String, required:true},
    createdAt: {type: Date, default: Date.now}
}, { collection: 'puzzles'})

export default mongoose.models.Puzzle || mongoose.model('Puzzle', puzzleSchema)