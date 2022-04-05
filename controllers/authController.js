const User = require('./../models/User');
exports.getLogin = (req, res) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    title: 'Login',
    errorMessage: 'message',
    oldValues: {
      email: '',
      password: '',
    },
  });
};

exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email, password);
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.render('auth/login', {
          title: 'Login',
          errorMessage: req.flash('error', ''),
          createSuccess: req.flash('success', ''),
          oldValues: {
            email: email,
            password: password,
          },
        });
      }
      //if user is found make sure the email and password match
      //create authenticate method in user model
      if (!user.authenticate(password)) {
        req.flash('error', 'Failed to load');
        return res.redirect('auth/login');
        // return res.render('auth/login', {
        //   title: 'Login',
        //   errorMessage: 'message',
        // });
      }
      // console.log(user);
      return res.render('home', {
        title: 'Home',
      });
      // return res.json({ token, user: { _id, email, name, role } });
    });
  } catch (error) {
    console.log(error);
    req.flash('error', 'Failed to load');
    return res.redirect('/');
  }
};
