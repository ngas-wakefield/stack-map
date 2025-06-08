import express from 'express'
import Skill from '../models/Skill.js'
import checkJwt from '../middleware/auth.js'

const router = express.Router()

// Create a new skill (userId is set from the token, not from client)
router.post('/', checkJwt, async (req, res) => {
  console.log('req.user:', req.user) // 👈 DEBUG THIS

  if (!req.user) {
    return res.status(401).json({ message: 'No user info found in token.' })
  }

  const skill = new Skill({
    userId: req.user.sub,
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

// Get all skills by userId (user must be authenticated and can only get their own skills)
router.get('/:userId', checkJwt, async (req, res) => {
  if (req.user.sub !== req.params.userId) {
    return res.status(403).json({ message: 'Unauthorized' })
  }

  try {
    const skills = await Skill.find({ userId: req.params.userId })
    res.json(skills)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
