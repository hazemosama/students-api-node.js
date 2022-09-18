const fs = require('fs');
const path = require('path');
const studentsPath = path.join(path.dirname(process.mainModule.filename), "data", "students.json")

module.exports = class Student {
    constructor(nm, dept) {
        this.name = nm;
        this.dept = dept;
    }

    static fetchAllStudents(callback) {
        fs.readFile(studentsPath, (err, info) => {
            if (!err) {
                console.log(JSON.parse(info));
                callback(JSON.parse(info));
            } else {
                return callback([]);
            }
        });
    }

    saveStudent() {
        // Students.push(this)
        // 1- read file
        fs.readFile(studentsPath, (err, info) => {
            if (!err) {
                let students = [];
                students = JSON.parse(info);
                this.id = students.length + 1;
                // 2- update data
                students.push(this);
                // 3- write updated data into file
                fs.writeFile(studentsPath, JSON.stringify(students), (err) => {
                    console.log(err);
                })
            }
        });
    }

    static updateStudents(newList) {
        fs.writeFile(studentsPath, JSON.stringify(newList), (err) => {
            console.log(err);
        })
    }
}