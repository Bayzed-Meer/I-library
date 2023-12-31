const Student = require('./../models/Student');
const bcrypt = require('bcrypt');

exports.scanCard = async (req, res) => {
  try {
    const libraryId = req.body.libraryId;
    let student = await Student.findOne({ libraryId });

    if (!student) {
      throw new Error('Student not found for the provided libraryId');
    } else if (student.activities.length > 0 && !student.activities[student.activities.length - 1].exitTime) {
      student.activities[student.activities.length - 1].exitTime = new Date();
    } else {
      student.activities.push({ entryTime: new Date() });
    }

    await student.save({ validateBeforeSave: false });
    const recentActivity = student.activities[student.activities.length - 1];
    res.json({ libraryId, recentActivity });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};


exports.getStudentsWithActivities = async (req, res) => {
  try {
    const students = await Student.aggregate([
      {
        $match: {
          'activities': { $ne: [] },
          $or: [
            { 'activities.entryTime': { $ne: null } },
            { 'activities.exitTime': { $ne: null } },
          ],
        },
      },
      {
        $project: {
          username: 1,
          studentId: 1,
          libraryId: 1,
          email: 1,
          phoneNumber: 1,
          department: 1,
          password: 1,
          role: 1,
          activities: {
            $slice: ['$activities', -1],
          },
        },
      },
    ]);
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getStudent = async(req, res) => {
  const libraryId = req.params.libraryId;
  try {
    const student = await Student.findOne({ libraryId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.updateStudent = async (req, res) => {
  const libraryId = req.params.libraryId;
  const updatedData = req.body;

  try {
    const student = await Student.findOne({ libraryId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isPasswordValid = await bcrypt.compare(updatedData.password, student.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    Object.assign(student, updatedData);

    if (req.file) {
      student.image = req.file.path;
    }

    await student.save({ validateBeforeSave: false });

    res.status(200).json({ message: 'Student details updated successfully' });
  } catch (error) {
    console.error('Error updating student details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

