const express = require('express');
const router = express.Router();

const { verifyToken, verifyRole } = require('../Middlewares/AuthMiddleware');
const ProjectUpdate = require('../Models/ProjectUpdate');

const userAccess = [verifyToken, verifyRole('user')];

/* CREATE */
router.post('/', userAccess, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message required' });
    }

    const update = await ProjectUpdate.create({
      userId: req.user._id,
      message
    });

    res.json({ success: true, update });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to create update' });
  }
});

/* GET ALL */
router.get('/', userAccess, async (req, res) => {
  try {
    const updates = await ProjectUpdate.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ success: true, updates });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to fetch updates' });
  }
});

/* UPDATE */
router.put('/:id', userAccess, async (req, res) => {
  try {
    const { message } = req.body;

    const update = await ProjectUpdate.findByIdAndUpdate(
      req.params.id,
      { message },
      { new: true }
    );

    res.json({ success: true, update });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
});

/* DELETE */
router.delete('/:id', userAccess, async (req, res) => {
  try {
    await ProjectUpdate.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
});

module.exports = router;
