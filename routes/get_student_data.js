module.exports = (webserver, mysql, database) => {

    const output = {
        success: false,
        data: [],
        errors: []
    };

    webserver.get('/api/get_student_data', (req, res)=> {
        let query = `SELECT 
            id, 
            first_name, 
            last_name
        FROM users`;

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