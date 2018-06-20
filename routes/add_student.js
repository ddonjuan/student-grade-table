module.exports = (webserver, mysql, database) => {
    webserver.post('/api/add_student', (req, res)=> {
        const output = {
            success: false,
            data: [],
            errors: [],
            message: ""
        };
        const { class_name, student_name, grade_value} = req.body;

        query = `INSERT INTO 
                grade (class_name, student_name, grade_value)
                VALUES (?,?,?)`;
        
        
        let inserts = [ class_name, student_name, grade_value];

        let mysqlQuery = mysql.format(query, inserts);

    database.query(mysqlQuery, (err, data, fields)=>{
            if(!err){
                console.log("data: ",data)
                output.success = true;
                output.data = data;
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