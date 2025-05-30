"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractClassesFactory = void 0;
const Students_factory_1 = require("./Students-factory");
class AbstractClassesFactory {
    createUser(userid, name, email, password, permission) {
        const new_student = new Students_factory_1.Students(userid, name, email, password, permission);
        new_student.createStudents(userid, name, email, password, permission);
        return new_student;
    }
}
exports.AbstractClassesFactory = AbstractClassesFactory;
