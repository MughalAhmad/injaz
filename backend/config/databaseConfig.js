const mongoose = require("mongoose");
const Usermodel = require('../models/userModel')


const dataBaseConfig = async () => {

    let mongoUrl = process.env.MONGO_LOCAL_URL;
    // if (process.env.NODE_ENV === 'production') {
    //     mongoUrl = process.env.MONGO_CLOUD_URL;
    // }

    return await new Promise(resolve => {
        mongoose.connect(mongoUrl)
            .then(async (data) => {
                if (process.env.NODE_ENV === 'production') {
                    console.log(`Production Database connected on port: ${data.connection.port}`);
                } else {
                    console.log(`Development Database connected on port: ${data.connection.port}`);
                }
                await createDefaultUser();
                resolve({ err: null })
            }).catch((err) => {
                resolve({ err: err })
            });

    })
}
module.exports = dataBaseConfig;


async function createDefaultUser() {
    const defaultUser = {
        userName:"Admin",
        email: "injazadmin@gmail.com",
        password: "123456",
        updatedAt: new Date(),
        createdAt: new Date(),
    };
    const existingUser = await Usermodel.find();

    if (existingUser.length === 0) {
        await Usermodel.create(defaultUser);
        console.log('Default User created.');
    } else {
        console.log('User already exists.');
    }
}
