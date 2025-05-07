const studentService = require('../services/studentservice');

exports.createStudent = async (req, res) => {
  try {
    const student = await studentService.addStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create student' });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 20, sortBy = 'created_at', sortOrder = 'desc' } = req.query;
    const data = await studentService.getAllStudents(+page, +limit, sortBy, sortOrder);
    res.setHeader('TotalCount', data.totalCount);
    res.status(200).json(data.students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};
