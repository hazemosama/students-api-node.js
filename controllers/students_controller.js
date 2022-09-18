const validator = require("../util/students_validator");
const Student = require("../models/student_model");

//render students(view)
const viewStudents = (req, res) => {
    res.render("students.ejs", {
        students: Student.fetchAllStudents(),
    });
};

// request all students
const getAllStudents = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    Student.fetchAllStudents((students) => {
        res.json({
            status: `${res.statusCode}`,
            msg: "successfully get API",
            data: students,
        });
    });
};

// request one student by id
const getStudentById = (req, res) => {
    // let id = req.params.id;
    let id = req.id;
    let student = Students.find((val, idx, arr) => {
        return val.id == id;
    });

    if (student) res.json({ msg: "successfully get API", data: student });
    else res.json({ msg: "student not found", data: {} });
};

//post student
const createStudent = (req, res) => {
    let valid = validator(req.body);
    if (valid) {
        let student = new Student(req.body.name, req.body.dept);
        res.json({
            msg: "user added successfully",
            user: student,
        });
        student.saveStudent();
    } else {
        res.status(403).json({
            msg: "wrong entries, no user added!",
        });
    }
};

const deleteStudent = (req, res) => {
    Student.fetchAllStudents((stds) => {
        let index = stds.findIndex((std) => {
            return std.id == req.params.id;
        });
        if (index != -1) {
            stds.splice(index, 1);
            res.json({
                status: res.statusCode,
                message: "Student removed successfully",
            });
            Student.updateStudents(stds);
        } else {
            res.status(404);
            res.json({
                status: res.statusCode,
                message: "Student not found!, nothing deleted",
            });
        }
    });
};

const updateStudent = (req, res) => {
    Student.fetchAllStudents((stds) => {
        let index = stds.findIndex((std) => {
            return std.id == req.params.id;
        });
        if (index != -1) {
            for (i in req.body) {
                stds[index][i] = req.body[i];
            }
            res.json({
                status: res.statusCode,
                message: "Student updated successfully",
                data: stds[index],
            });
            Student.updateStudents(stds);
        } else {
            res.status(404);
            res.json({
                status: res.statusCode,
                message: "Student not found!, nothing updated",
            });
        }
    });
};

module.exports = {
    viewStudents,
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudent,
    updateStudent,
};
