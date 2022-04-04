const pool = require('../../services/database.service').pool
const lodash =  require('lodash');
const validateParams = ['first_name', 'last_name']
class UserRepo {
    constructor(){}
    async findAll(){
        try{
            let res = await pool.query('SELECT * FROM users')
            console.log(`Succes controllers => database => user.controller => findAll`)
            return res
        }catch(e){
            throw new Error(`ERROR controllers => database => user.controller => findAll: ${e}`)
        }
        
    }

    async findAllByParams(params){
        try{
            let sql = 'SELECT * FROM users WHERE '
            let count = 0
            let arrParams = []
            const cleanedObject = lodash.pickBy(params, v => v !== 'undefined')
            for(let param in cleanedObject){
                if(!validateParams.includes(param)) throw new Error('This param not supported')

                count++
                if(count != Object.keys(cleanedObject).length){
                    sql += `${param} LIKE $${count} AND ` 
                }else{
                    sql += `${param} LIKE $${count}` 
                }
                arrParams.push(`%${params[param]}%`)
            }
            let res = await pool.query(sql, arrParams)
            console.log(`Succes controllers => database => user.controller => findAllByParams: ${sql}`)
            return res
        }catch(e){
            throw new Error(`ERROR controllers => database => user.controller => findAllByParams: ${e}`)
        }

    }
}

module.exports = new UserRepo()