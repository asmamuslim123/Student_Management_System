#! /usr/bin/env node
import inquirer from "inquirer";

class student {
    id: string;
    name: string;
    coursesEnrolled: string[];
    feesAmount: number;

    constructor(id: string, name: string, coursesEnrolled: string[], feesAmount: number){
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}

let baseId = 10000;
let studentId: string ="";
let continueEnrollment = true;
let students: student[] = [];

do {

    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option:\n",
        choices: ["Enroll a student", "Show student status"]
    });

    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Enter your name:"
        });
        let trimmedStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);

        if (studentNameCheck.includes(trimmedStudentName) === false) {
            if (trimmedStudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;

                console.log("\nYour account has been created");
                console.log(`Welcome, ${trimmedStudentName}!`);

                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select the course:",
                    choices: ["IT", "English", "Cooking"]
                });
                
                let courseFees = 0;
                switch(course.ans){
                    case "IT":
                        courseFees = 1000;
                        break;
                    case "English":
                        courseFees = 2000;
                        break;
                    case "Cooking":
                        courseFees = 3000;
                        break;
                    default:
                        courseFees = 0;
                        break;
                }

                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Are you sure you want to enroll in this course?"
                });

                if (courseConfirm.ans === true) {
                    let newStudent = new student(studentId, trimmedStudentName, [course.ans], courseFees);
                    students.push(newStudent);
                    console.log("You have been enrolled in this course");
                } else {
                    console.log("You have not been enrolled in any course");
                }
            } else {
                console.log("This name is already exists");
            }
        }
        
    } else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);

            let selectStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select a name:",
                choices: studentNameCheck
            });
            
            let selectedStudent = students.find(student => student.name === selectStudent.ans);

            console.log("Student information:");
            console.log(selectedStudent);
            console.log("\n");
        } else {
            console.log("There are no students");
        }
    }

    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue?"
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
