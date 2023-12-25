const Student = require('./../models/Student');

exports.scanCard = async (req, res) => {
  try {
    const libraryId = req.body.libraryId;
    let student = await Student.findOne({ libraryId });

    if (!student) {
      student = await Student.create({ libraryId });
    } else if (student.activities.length > 0 && !student.activities[student.activities.length - 1].exitTime) {
      student.activities[student.activities.length - 1].exitTime = new Date();
    } else {
      student.activities.push({ entryTime: new Date() });
    }

    await student.save();
    const recentActivity = student.activities[student.activities.length - 1];
    res.json({ libraryId, recentActivity });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getStudentsWithActivities = async (req, res) => {
  try {
    const students = await Student.aggregate([
      {
        $match: {
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
