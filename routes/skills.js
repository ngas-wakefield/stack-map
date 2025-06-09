import express from 'express'
import Skill from '../models/Skill.js'
import { checkJwt, checkScopes } from '../middleware/auth.js'

const router = express.Router()

// GET skills for user - requires read:skills scope
router.get(
  '/:userId',
  checkJwt,
  checkScopes(['read:skills']),
  async (req, res) => {
    if (req.auth.sub !== req.params.userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    try {
      const skills = await Skill.find({ userId: req.params.userId })
      res.json(skills)
    } catch (err) {
      console.error('Error fetching skills:', err)
      res.status(500).json({ message: err.message })
    }
  }
)

// POST new skill - requires write:skills scope
router.post('/', checkJwt, checkScopes(['write:skills']), async (req, res) => {
  const skill = new Skill({
    userId: req.auth.sub, // ✅ updated
    skillName: req.body.skillName,
    category: req.body.category,
    level: req.body.level,
  })

  try {
    const savedSkill = await skill.save()
    res.status(201).json(savedSkill)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE skill by id - requires delete:skills scope
router.delete('/:id', async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id)
    if (!deletedSkill) {
      return res.status(404).send('Skill not found')
    }
    res.json({ message: 'Skill deleted' })
  } catch (err) {
    console.error('Delete error:', err)
    res.status(500).send('Server error')
  }
})

export default router
