require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

const skillsRoutes = require('./routes/skillsRoutes');
app.use('/api/skills', skillsRoutes);

const certificationRoutes = require('./routes/certificationRoutes');
app.use('/api/certifications', certificationRoutes);

const languageRoutes = require('./routes/languageRoutes');
app.use('/api/languages', languageRoutes);

const hobbiesRoutes = require('./routes/hobbiesRoutes');
app.use('/api/hobbies', hobbiesRoutes);

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const resumeRoutes = require('./routes/resumeRoutes');
app.use('/api/resumes', resumeRoutes);




// Test route
app.get('/', (req, res) => {
  res.send('Resume Builder API is running ✅');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
