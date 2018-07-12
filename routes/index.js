module.exports = (webserver, mysql, database) => {
    require('./get_student_data')(webserver, mysql, database);
    require('./add_student')(webserver, mysql, database);
    require('./delete_student')(webserver, mysql, database);
    require('./edit_student')(webserver, mysql, database);
}