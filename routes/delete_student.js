module.exports = (webserver, mysql, database) => {
    webserver.delete('/api/delete_student', (req, res)=> {
        const output = {
            success: false,
            errors: [],
            message: ""
        };

        let id = req.query.id;

        query = `DELETE FROM grade
                WHERE id = ?`;    
        
        let inserts = [id]        
        let mysqlQuery = mysql.format(query, inserts);

    database.query(mysqlQuery, (err, data, fields)=>{
            if(!err){
                console.log("data: ",data)
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