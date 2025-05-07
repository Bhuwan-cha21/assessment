const db = require('../db');

exports.addStudent = async (data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
  const query = `INSERT INTO students(${keys.join(', ')}) VALUES(${placeholders}) RETURNING *`;

  const result = await db.query(query, values);
  return result.rows[0];
};

exports.getAllStudents = async (page, limit, sortBy, sortOrder) => {
  const offset = (page - 1) * limit;

  const totalQuery = `SELECT COUNT(*) FROM students`;
  const resultQuery = `
    SELECT * FROM students
    ORDER BY ${sortBy} ${sortOrder}
    LIMIT $1 OFFSET $2`;

  const totalResult = await db.query(totalQuery);
  const studentResult = await db.query(resultQuery, [limit, offset]);

  return {
    totalCount: +totalResult.rows[0].count,
    students: studentResult.rows,
  };
};
