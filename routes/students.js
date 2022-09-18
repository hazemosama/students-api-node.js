const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students_controller');


router.get("/", studentsController.getAllStudents);

router.param("id", (req, res, nxt, val) => {
    console.log(Number(val));
    if (Number(val)) {
        req.id = val;
        nxt();
    } else {
        res.json({
            status: res.statusCode,
            message: "Invalid id"
        })
    }
});

router.get("/view", studentsController.viewStudents);

router.get("/:id", studentsController.getStudentById);

// create new Student
router.post("/", studentsController.createStudent);

// delete existing student

router.delete("/:id", studentsController.deleteStudent);

// update one student

router.put("/:id", studentsController.updateStudent);

module.exports = router;