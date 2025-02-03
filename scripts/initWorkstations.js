const mongoose = require('mongoose');
const Workstation = require('./models/Workstation');

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
  await Workstation.deleteMany({}); // Clear existing workstations

  const workstations = [
    { name: 'Workstation 1', cost: 10 },
    { name: 'Workstation 2', cost: 5 },
    { name: 'Workstation 3', cost: 8 },
  ];

  await Workstation.insertMany(workstations);
  console.log('Workstations initialized');
  mongoose.connection.close();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
