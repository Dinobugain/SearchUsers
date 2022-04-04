const express = require('express');
const router = express.Router();
const UserRepo = require('../controllers/database/user.controller')

router.get('/get', async (req, res) =>{
    try{
        let result;
        if(Object.keys(req.query).length != 0){
            result = await UserRepo.findAllByParams(req.query)
        }else{
            result = await UserRepo.findAll()
        }
        console.log('Succes routes => user.router => /get')
        return res.status(200).json({result:true, users:result.rows})
    }catch(e){
        res.status(401).json({result:false, message: 'some Error'})
        throw new Error(`ERROR routes => users.router => /get: ${e}`)
    }
    
})

module.exports = router