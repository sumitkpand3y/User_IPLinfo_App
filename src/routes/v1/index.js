import express from 'express';

import { createTweet, getTweet } from '../../controllers/tweet-controller.js';
import { toggleLike } from '../../controllers/like-controller.js';
import { createComment } from '../../controllers/comment-controller.js';
import { signup, login } from '../../controllers/auth-controller.js';
import { updateTeam, getUser, getUserDetails, updateUserDetails  } from '../../controllers/user-controller.js';
import { authenticate } from '../../middlewares/authenticate.js'
import { getAllTeams } from '../../controllers/ipl-team-controller.js'
const router = express.Router();

router.post('/tweets', authenticate, createTweet);
router.get('/tweets/:id', getTweet);

router.post('/comments', authenticate, createComment);

router.post('/likes/toggle', toggleLike);

// register user
router.post('/signup', signup);

//login user
router.post('/login', login);



//update team for user 
router.patch('/subscribe',authenticate, updateTeam)
//get all IPL teams
router.get('/get-teams',authenticate, getAllTeams)


//get user details
router.get('/get-user-details',
    authenticate,
    getUser);

// // get admin role user detail
router.get('/get-all-user-details',
    authenticate,
    getUserDetails);
router.patch('/update-user-details', authenticate, updateUserDetails);

export default router;

