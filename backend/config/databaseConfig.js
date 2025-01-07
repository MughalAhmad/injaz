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
        firstName:"Admin",
        lastName: "Admin",
        email: "contact@conqueror.ae",
        password: "Conq@2023",
        phone:0,
        mobile:0,
        phoneCode:"UAE-+71",
        mobileCode:"UAE-+71",
        address:"Moghalpura",
        userId:"admin123",
        role:"admin",
        nationality:"none",
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
