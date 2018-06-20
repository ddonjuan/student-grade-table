module.exports = (webserver, mysql, database) => {
    webserver.get('/api/get_student_data', (req, res)=> {
        const output = {
            success: false,
            data: [],
            errors: [],
            message: ""
        };

        let query = `SELECT 
            id, 
            class_name, 
            student_name,
            grade_value
        FROM grade`;

    database.query(query, (err, data, fields)=>{
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