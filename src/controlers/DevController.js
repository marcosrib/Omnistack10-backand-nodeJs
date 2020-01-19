
const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray')

const { findConections, sendMessage } = require('../websocket')
module.exports = {

    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, techs, longitude, latitude } = req.body;
        
         
        let dev = await Dev.findOne(
            { github_username }
        )
    
        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = response.data;
            
            const techsArray = parseStringAsArray(techs);
            console.log(techsArray);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }



            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            Dev.collection.createIndex({ location: "2dsphere" })

            const sendSocketMessageTo = findConections(
                { latitude, longitude },
                techsArray
            )
            console.log(sendSocketMessageTo);
            
            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }

       
        return res.json(dev);
    }
}