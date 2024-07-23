const express = require('express');
const Assessment = require('../models/Assessment');
const auth = require('../middleware/auth');

const router = express.Router();
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newAssessment = new Assessment({
      title,
      description,
      user: req.user.id
    });

    const assessment = await newAssessment.save();
    res.json(assessment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/', auth, async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.user.id }).sort({ date: -1 });
    res.json(assessments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;


router.put('/:id', auth, async (req, res) => {
    const { title, description } = req.body;
  
    try {
      const assessment = await Assessment.findById(req.params.id);
  
      if (!assessment) {
        return res.status(404).json({ msg: 'Assessment not found' });
      }
  
      assessment.title = title || assessment.title;
      assessment.description = description || assessment.description;
  
      await assessment.save();
      res.json(assessment);
    } catch (err) {
      res.status(400).json({ msg: 'Invalid data' });
    }
  });
  
 
  router.delete('/:id', auth, async (req, res) => {
    try {
      const id = req.params.id;
  
      // Log the ID for debugging purposes
      console.log(`Deleting assessment with ID: ${id}`);
  
      // Check if the ID is valid
      if (!id || id === 'undefined') {
        return res.status(400).json({ msg: 'Invalid ID' });
      }
  
      const assessment = await Assessment.findById(id);
  
      // Check if assessment exists
      if (!assessment) {
        return res.status(404).json({ msg: 'Assessment not found' });
      }
  
      // Delete the assessment
      await Assessment.findByIdAndDelete(id);
  
      res.json({ msg: 'Assessment removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  });
  
  module.exports = router;