const { connect } = require("mongoose");

const connectDB = async() => {
    try {
        await connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("MongDB connected ...");
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

module.exports = connectDB;