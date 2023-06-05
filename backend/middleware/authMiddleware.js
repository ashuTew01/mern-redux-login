//This is the file that protects the routes. That means it only lets you access protected routes
//after checking if you have logged in and the token is valid.

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password'); //the '-password' makes sure the password, even though hashed, is not returned.

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});


            
export { protect }; 

//Not the default as their may be more routes like the admin, seller, user etc. which have to be protected separately.