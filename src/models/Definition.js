import mongoose from 'mongoose'

const definitionSchema = new mongoose.Schema({
    number:  { type: Number, required: true, unique: true},
    word:  { type: String, required: true, unique: true},
    hint: { type: String, required:true},
    createdAt: {type: Date, default: Date.now}
}, { collection: 'definitions'})

export default mongoose.models.Definition || mongoose.model('Definition', definitionSchema)