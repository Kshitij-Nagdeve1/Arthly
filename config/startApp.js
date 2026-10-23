const connectDB = require('./database.js');


const startApp = async () => {

    await connectDB()
        .then(() => {
            console.log("Database connected successfuly");
        }).catch((err) => {
            console.log(err);
        });
}

module.exports = startApp;