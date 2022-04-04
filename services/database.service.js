const { Pool } = require('pg');
const axios = require('axios');
const { takeWhile } = require('lodash');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'LadaProject',
    password: 'root',
    port: 5432,
})
class Database{
    constructor(){
        this.pool = pool
        this.initializeTables()
        setInterval(() =>{
            this.databaseUpdate()
        }, 1000*60)
        
    }

    databaseUpdate(){
        let self = this
        axios.get('https://reqres.in/api/users').then(function(res){
            for(let item of res.data.data){
                self.pool.query(`
                    INSERT INTO users(id, email, first_name, last_name, avatar) VALUES($1, $2, $3, $4, $5) 
                    ON CONFLICT (id) DO UPDATE 
                    SET email = $2, 
                        first_name = $3, 
                        last_name = $4, 
                        avatar = $5
                    RETURNING *`, Object.values(item), (err, res) => {
                    if (err) throw new Error(`ERROR services => database.service => databaseUpdate: ${err}`)
                    else console.log('SUCCESS services => database.service => databaseUpdate')
                })
            }
           
        })
    }

    initializeTables(){
        this.pool.query('select 1+1 as result', (err, res) =>{
            if(err) throw new Error(`ERROR services => database.service => initializeTables: ${err}`)
            else console.log('Connected successfully to postgress')
        })
        this.pool.query(`CREATE TABLE IF NOT EXISTS users(
            id INTEGER NOT NULL PRIMARY KEY,
            email varchar(255) NOT NULL,
            first_name varchar(255),
            last_name varchar(255),
            avatar varchar(255)
        )`, (err, res) =>{
            if (err) throw new Error(`ERROR services => database.service => initializeTables: ${err}`)
            else console.log('SUCCESS services => database.service => initializeTables')
        })
    }

}

module.exports = new Database()