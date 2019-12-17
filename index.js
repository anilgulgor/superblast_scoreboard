require('dotenv').config({ path: './.env-prod' })

const Hapi = require('hapi')
const Glob = require('glob')
const Path = require('path')
const mongoose = require('mongoose').Mongoose

var env = process.env;

var db = new mongoose()

const server = new Hapi.Server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080
})

const initServer = async() => {
    
    try {
        await server.start();
        console.log("Server running at ", server.info.uri );
        
        try {
            await db.connect(process.env.mongoUri , { dbName:'superblast_scoreboard', useNewUrlParser: true, autoIndex:false, useUnifiedTopology: true });
            
        }
        catch (err) {
            console.log(err);
        }
    
        

    }
    catch (err) {
        console.log(err);
    }

}

db.connection.once('open', () => {
    console.log('info','connected to db');
})
.once('error', (err) => {
    console.log('error', err)
})

initServer().then(() => {
    exports.db = db;
    Glob.sync('api/**/routes.js', {root: __dirname}).forEach(file => {
        const route = require(Path.join(__dirname, file));
        server.route(route);
    })
})



