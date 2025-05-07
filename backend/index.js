const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentroute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/students', studentRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
