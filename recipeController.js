require('../models/database');
const Category = require('../models/Category')


/**
 * Get /
 * Home page
 */
exports.homepage = async(req,res) => {

    try {
        const limitnum=5;
        const categories = await Category.find({}).limit(limitnum);


        res.render('index', { title: 'Homepage', categories });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Happened"});
    }
}

/**
 * Get /categories
 * categories
 */
 exports.exC = async(req,res) => {

    try {
        const limitnum=5;
        const categories = await Category.find({}).limit(limitnum);


        res.render('categories', { title: 'View all', categories });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Happened"});
    }
}





// async function insertData(){
//     try {
//         await Category.insertMany([
//             {
//                 "name": "The ShawShank Redemption",
//                 "image": "ssr.jpg"
//             },
//             {
//                 "name": "The Dark Knight",
//                 "image": "darkknight.jpg"
//             },
//             {
//                 "name": "Avengers Infinity War",
//                 "image": "iw.jpg"
//             },
//             {
//                 "name": "The Wolf of Wall Street",
//                 "image": "wolf.jpg"
//             },
//             {
//                 "name": "Interstellar",
//                 "image": "is.jpg"
//             },
//             {
//                 "name": "The Lego Movie",
//                 "image": "lm.jpg"
//             }
//         ]);
//     } catch (error) {
//         console.log(error)
//     }
// }

//insertData();