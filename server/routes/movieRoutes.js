const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

/**
 * App routes
 */
router.get('/',movieController.homepage);
router.get('/categories',movieController.exC);
router.get('/movie/:id',movieController.exploreM);
router.get('/categories/:id',movieController.exCid);
router.post('/search',movieController.searchM);
router.get('/submit-movie',movieController.submit);
router.post('/submit-movie',movieController.submitonpost)
router.get('/about',movieController.aboutUs);
router.get('/login',movieController.loginPage);
router.get('/signup',movieController.signupPage);
router.get('/profile',movieController.loggedprofile);
router.get('/register',movieController.registerprofile);
router.get('/logout',movieController.logout);
//router.delete('/profile',movieController.remove);

//router.delete('/movie/:id',movieController.delete);




module.exports = router ; 