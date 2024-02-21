const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '65cd23847dc509bcd6c132c4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis dolore sequi eligendi iusto obcaecati alias, minus amet? Suscipit cum quibusdam reiciendis ab pariatur velit, earum asperiores natus, qui exercitationem dolorem.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwguf4w1t/image/upload/v1708111611/YelpCamp/vrmnemgxqksb1szptpgz.png',
                    filename: 'YelpCamp/vrmnemgxqksb1szptpgz',
                },
                {
                    url: 'https://res.cloudinary.com/dwguf4w1t/image/upload/v1708111614/YelpCamp/xrkzt87l0ojmrov5vukx.jpg',
                    filename: 'YelpCamp/xrkzt87l0ojmrov5vukx',
                },
                {
                    url: 'https://res.cloudinary.com/dwguf4w1t/image/upload/v1708111615/YelpCamp/c9dirswewozavhmtg2am.jpg',
                    filename: 'YelpCamp/c9dirswewozavhmtg2am',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});