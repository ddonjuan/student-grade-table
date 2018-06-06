module.exports = (webserver, mysql, database) => {
    require('./get_student_data')(webserver, mysql, database);
}