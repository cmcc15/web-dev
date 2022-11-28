require('../models/database');
const Category = require('../models/Category');
const Movie = require('../models/Movie');
const abouts = require('../models/about');
const Login = require('../models/login');
const Signup = require('../models/signup');
const Profile = require('../models/profile');
const Register = require('../models/register');
const Logout = require('../models/logout');
//const Movie = require('../models/Recipe')


// Get home page
exports.homepage = async(req,res) => {

    try {
        const limitnum=5;
        const categories = await Category.find({}).limit(limitnum);
        const latest = await Movie.find({}).sort({_id: -1}).limit(limitnum);
        const Scifi= await Movie.find({'category':'Sci-fi'}).limit(limitnum);
        const Crime= await Movie.find({'category':'Crime'}).limit(limitnum);
        const Thriller = await Movie.find({'category':'Thriller'}).limit(limitnum);
        const Comedy = await Movie.find({'category':'Comedy'}).limit(limitnum);
        const Horror = await Movie.find({'category':'Horror'}).limit(limitnum);
        const Action = await Movie.find({'category':'Action'}).limit(limitnum);

        const movie = {latest , Scifi , Crime, Thriller, Comedy, Horror, Action};


        res.render('index', { title: 'Homepage', categories, movie });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Happened"});
    }
}

//Get catogories
 exports.exC = async(req,res) => {

    try {
        const limitnum=20;
        const categories = await Category.find({}).limit(limitnum);


        res.render('categories', { title: 'View all', categories });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Happened"});
    }
}

//get movie id
exports.exploreM = async(req, res) => {
    try {
      let movieId = req.params.id;
      const movie = await Movie.findById(movieId);
      res.render('movie', { title: 'Movie', movie } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 


//get catogory id
exports.exCid = async(req,res) => {

    try {
        let categoryId =req.params.id;
        

        const limitnum=20;
        const categoryById = await Movie.find({'category': categoryId}).limit(limitnum);


        res.render('categories', { title: 'View all', categoryById });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Happened"});
    }
}

//Post Search
exports.searchM = async(req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      let movie = await Movie.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      res.render('search', { title: 'search', movie } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
    
  }


  /////// submit
  exports.submit = async(req, res) => {
    
    const infoErrorsObj= req.flash('infoErrors');
    const infoSubmitObj= req.flash('infoSubmit');

    res.render('submit',{'title': 'Submit ', infoErrorsObj, infoSubmitObj});
  }

  /////// submit post
  exports.submitonpost = async(req, res) => {
    
    try {

      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }
  
      const newMovie = new Movie({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: newImageName
      });
      
      await newMovie.save();
  
      req.flash('infoSubmit', 'Movie has been added.')
      res.redirect('/submit-movie');
    } catch (error) {
      // res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/submit-movie');
    }
  }


  //////////////////////////about

  exports.aboutUs = async(req,res) => {

    try {
        const limitnum=20;
        const about = await abouts.find({}).limit(limitnum);


        res.render('about', { title: 'View all', about });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Happened"});
    }
}




exports.loginPage = async(req,res) => {

  try {
      const limitnum=20;
      const login = await Login.find({}).limit(limitnum);


      res.render('login', { title: 'View all', login });
  } catch (error) {
      res.status(500).send({message: error.message || "Error Happened"});
  }
}



exports.signupPage = async(req,res) => {

  try {
      const limitnum=20;
      const signup = await Signup.find({}).limit(limitnum);


      res.render('signup', { title: 'View all', signup });
  } catch (error) {
      res.status(500).send({message: error.message || "Error Happened"});
  }
}

exports.loggedprofile = async(req,res) => {

  try {
      const limitnum=20;
      const profile = await Profile.find({}).limit(limitnum);


      res.render('profile', { title: 'View all', profile });
  } catch (error) {
      res.status(500).send({message: error.message || "Error Happened"});
  }
}


exports.registerprofile = async(req,res) => {

  try {
      const limitnum=20;
      const register = await Register.find({}).limit(limitnum);


      res.render('register', { title: 'View all', register });
  } catch (error) {
      res.status(500).send({message: error.message || "Error Happened"});
  }
}


exports.logout = async(req,res) => {

  try {
      const limitnum=20;
      const logout = await Logout.find({}).limit(limitnum);


      res.render('logout', { title: 'View all', logout });
  } catch (error) {
      res.status(500).send({message: error.message || "Error Happened"});
  }
}

// router.delete('/movie/:id', (req, res,next) => {
//   let result = movie.find((x) => x.movieID == req.params.id)
//   res.send(result);
//  })

// function update(req,res,next){
//   Movie.findByIdAndUpdate(req.params.id,req.body, (err,emp)=>{
//     if (err) {
//       return res.status(500).send({error: "Problem with Updating the   Employee recored "})
//     };
//     res.send({success: "Updation successfull"});
//   })
// }
// module.exports.update = update

// function remove(req,res,next){
//   Emp.findByIdAndDelete(req.params.id, (err,emp)=>{
//     if(err){
//       return res.status(500).send({error: "Problem with Deleting the Employee recored "})
//     }
//     res.send({success: 'Employee deleted successfully'})
//   })
// }
// module.exports.remove = remove

// async function insertData(){
//     try {
//         await Category.insertMany([
//             {
//                 "name": "Action",
//                 "image": "action.jpg"
//             },
//             {
//                 "name": "Thriller",
//                 "image": "thriller.jpg"
//             },
//             {
//                 "name": "Comedy",
//                 "image": "comedy.jpeg"
//             },
//             {
//                 "name": "Crime",
//                 "image": "crime.jpg"
//             },
//             {
//                 "name": "Horror",
//                 "image": "horror.jpg"
//             },
//             {
//                 "name": "Sci-fi",
//                 "image": "scifi.jpg"
//             }
//         ]);
//     } catch (error) {
//         console.log(error)
//     }
// }

// insertData();

// async function insertMovie(){
//         try {
//             await Movie.insertMany([{
//                     "name": "The Godfather",
//                     "description": `Stanley Kubrick once described Francis Ford Coppola's adaptation of Mario Puzo's novel as the best film ever made – though having previously topped this list, this time it falls to bronze position. At once an art movie and a commercial blockbuster, The Godfather marked the dawn of the age of the mega-movie. An icon of the gangster genre, its imprinted in popular culture – "Luca Brasi sleeps with the fishes", the horse's head in the bed – but the first instalment of Brando's cotton-cheeked patriarch's fight for power is so much more than those moments. With performances, style and substance to savour, it's managed to both smash box office records and live on as a staple of cinematic canon.`,
//                     "email": "BrianHolland@gmail.com",
//                     "category": "Crime", 
//                     "image": "gf.jpg"
//             },
//             {
//                 "name": "Star Wars: The Empire Strikes Back",
//                 "description": `The original "this one's darker" sequel, and by far the strongest of the saga. Not just because the baddies win (temporarily), or because it Force-slammed us with that twist ("No, I am your father"). Empire super-stardestroys thanks to the way it deepens the core relationships — none more effectively than Han and Leia's. She loves him. He knows. And it still hurts.`,
//                 "email": "BrianHolland@gmail.com",
//                 "category": "Sci-fi", 
//                 "image": "esb.jpg"
//             },
//             {
//                 "name": "Jaws",
//                 "description": `Forty-five years young, and Spielberg's breakthrough remains the touchstone for event-movie cinema. Not that any studio these days would dare put out a summer blockbuster that's half monster-on-the-rampage disaster, half guys-bonding-on-a-fishing-trip adventure. Maybe that's why it's never been rebooted. Or just because it's genuinely unsurpassable.`,
//                 "email": "leahc@icloud.com",
//                 "category": "Action", 
//                 "image": "jaws.jpg"
//             },
//             {
//                 "name": "Pulp Fiction",
//                 "description": `If Reservoir Dogs was a blood-spattered calling card, Pulp Fiction saw Quentin Tarantino kick our front door off its hinges — and then get applauded for doing it with such goddamn panache. It wore its numerous influences on its sleeve and yet felt utterly, invigoratingly fresh and new. We happy? Yeah, we happy.`,
//                 "email": "cmcclliverpool@gmail.com",
//                 "category": "Thriller", 
//                 "image": "pi.jpg"
//             },
//             {
//                 "name": "Goodfellas",
//                 "description": `Where Coppola embroiled us in the politics of the Mafia elite, Martin Scorsese drew us into the treacherous but seductive world of the Mob's foot soldiers. And its honesty was as impactful as its sudden outbursts of (usually Joe Pesci-instigated) violence. Not merely via Henry Hill's (Ray Liotta) narrative, but also Karen's (Lorraine Bracco) perspective: when Henry gives her a gun to hide, she admits, "It turned me on."`,
//                 "email": "BrianHolland@gmail.com",
//                 "category":"Crime", 
//                 "image": "good.jpg"
//             }
//             ]
//             );
//         } catch (error) {
//             console.log(error)
//         }
//     }
    
//     insertMovie();

// async function insertlogin(){
//   try {
//       await login.insertMany([
//           {
//               "Username": "cmcc15",
//               "Email": "cormacredmen@gmail.com",
//               "Password" : "Liverpool2112",
//               "Confirm_Password":"Liverpool2112"
//           },
//           {
//             "Username": "ejp",
//             "Email": "emmajane@gmail.com",
//             "Password" : "LukeLover",
//             "Confirm_Password":"LukeLover"
//           }
//       ]);
//   } catch (error) {
//       console.log(error)
//   }
// }

// insertlogin();


//Delete Movie
// async function deleteMovie(){
//   try {
//     await Movie.deleteMany({ name: 'Jaws' });
//   } catch (error) {
//     console.log(error);
//   }
// }

// deleteMovie();


// async function updateMovie(){
//   try {
//     const res = await Movie.updateOne({ name: 'Jaws' }, { name: 'Jaws 2' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateMovie();