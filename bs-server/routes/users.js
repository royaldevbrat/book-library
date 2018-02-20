const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  User.userCount((err, count) => {
    if (err) {
      res.json({ success: false, msg: 'Unable to register user' });
    } else {
      let roleType = '';
      if (count > 0) {
        roleType = 'Reader';
      } else {
        roleType = 'Editor';
      }
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: roleType
      });
      User.getUserByEmail(req.body.email, (err, user) => {
        if (err) {
          res.json({ success: false, msg: 'Failed to register user' });
        } else{
          if (!user) {
            User.addUser(newUser, (err, user) => {
              if (err) {
                res.json({ success: false, msg: 'Failed to register user' });
              } else {
                res.json({ success: true, msg: 'User registered' });
              }
            });
          } else {
            res.json({ success: false, msg: 'Email id already registered' });
          }
        }
      });

    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

router.post('/addNewUser', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  User.getUserByEmail(req.body.email, (err, user) => {
    if (err) throw err;
    if (!user) {
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: req.body.role
      });
      User.addUser(newUser, (err, user) => {
        if (err) {
          res.json({ success: false, msg: 'Failed to add user' });
        } else {
          res.json({ success: true, msg: 'User added Successfully', user: user });
        }
      });
    } else {
      res.json({ success: false, msg: 'User already exists' });
    }
  });
});
//Fetch all users
router.get('/getAllUsers', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  User.getUsers((err, users) => {
    if (err) {
      res.json({ success: false, msg: 'Unable to register user' });
    } else {
      res.json({ success: true, users: users });
    }
  });
});
router.get('/deleteUser/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  User.deleteUser(req.params.id, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Unable to delete user' });
    } else {
      res.json({ success: true });
    }
  });
});
router.get('/getAllEmail',(req, res, next) => {
  User.getEmail((err, email) => {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: 'All email details' });
    } else {
      res.json({ success: true, email: email });
    }

  });
});



//get user for task module
router.get('/getuser',function(req,res){
    User.getUser((err,users)=>{
       if(err){
           console.log("user not coming");
       }
       else{
           res.json({"success":true,users:users})
       }
    })

    
});

module.exports = router;
