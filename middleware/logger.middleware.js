const {createLogger,format,transports}=require('winston')
require('winston-mongodb')
require('dotenv').config()

const logger = createLogger({
    format : format.json(),
    transports : [
        new transports.MongoDB({
            db:process.env.mongoUrl,
            collection: "user-history",
            level:"info",
            options : {useUnifiedTopology: true},
            format:format.combine(format.timestamp())
        }),
        new transports.File({
            filename:"error.txt",
            level:"silly",
            format:format.combine(format.timestamp())
        })
    ]
})


module.exports={logger};