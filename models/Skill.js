import mongoose from 'mongoose'

const SkillSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  skillName: { type: String, required: true },
  category: String,
  level: Number,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Skill', SkillSchema)
