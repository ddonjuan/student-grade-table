module.exports = (webserver, mysql, database) => {
    webserver.post('/api/edit_student', (req, res)=> {
        const output = {
            success: false,
            data:[],
            errors: [],
            message: ""
        };

        const id = req.query.id;
        const { class_name, student_name, grade_value} = req.body;


        query = `UPDATE grade
            SET class_name = ?, 
                student_name = ?, 
                grade_value = ?
            WHERE id = ?`;    
        
        let inserts = [class_name, student_name, grade_value, id];

        let mysqlQuery = mysql.format(query, inserts);

    database.query(mysqlQuery, (err, data, fields)=>{
            if(!err){
                console.log("data: ",data)
                output.data = data;
                output.success = true;
                output.message = "query was successful";
            }
            else{
                console.log("errors: ",err);
                output.errors = err;
            }
            res.json(output);
         });    
    });
}
