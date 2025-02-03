const express = require('express');
const router = express.Router();
const Workstation = require('../models/Workstation');

// Allocate work to the least costly and available workstation
router.post('/allocate', async (req, res) => {
  try {
    // Fetch all available workstations sorted by cost and least work assigned
    const workstations = await Workstation.find({ isAvailable: true })
      .sort({ cost: 1, workAssigned: 1 });

    if (workstations.length === 0) {
      return res.status(400).json({ message: 'No available workstations' });
    }

    // Find the workstation with the least cost and least work assigned
    const workstationToAssign = workstations[0];

    // Update workstation with assigned work
    workstationToAssign.workAssigned += 1;
    await workstationToAssign.save();

    // Return assigned workstation
    res.status(200).json({ message: 'Work assigned successfully', workstation: workstationToAssign });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
