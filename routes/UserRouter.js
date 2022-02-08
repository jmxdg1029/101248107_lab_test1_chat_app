const express = require('express')
const userModel = require('../model/user');
const app = express();


app.get('/Users', async(req,res) => {
    const user = await userModel.find({})

    try{
        console.log(user[0].name)
        res.status(200).send(user);
    }catch(err){
        res.status(500).send(err)
    }
})

module.exports = app;