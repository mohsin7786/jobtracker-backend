const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// Sabhi jobs lo (sirf us user ki)
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Nayi job add karo
router.post('/', auth, async (req, res) => {
  try {
    console.log('UserId:', req.userId);
    const { company, role, status, date, notes } = req.body;

    const job = new Job({
      userId: req.userId,
      company,
      role,
      status: status || 'Applied',
      date: date || Date.now(),
      notes: notes || ''
    });

    await job.save();
    res.status(201).json({ message: 'Job add ho gayi!', job });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Job update karo
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.userId });

    if (!job) {
      return res.status(404).json({ message: 'Job nahi mili' });
    }

    const { company, role, status, date, notes } = req.body;

    job.company = company || job.company;
    job.role = role || job.role;
    job.status = status || job.status;
    job.date = date || job.date;
    job.notes = notes || job.notes;

    await job.save();
    res.json({ message: 'Job update ho gayi!', job });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Job delete karo
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!job) {
      return res.status(404).json({ message: 'Job nahi mili' });
    }

    res.json({ message: 'Job delete ho gayi!' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;