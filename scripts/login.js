// Login with facebook.
passport.use(new FacebookStrategy({
    clientID: '385817268215603',
    clientSecret: 'fbebdf8eea19e8bffb066e226ac2fcff',
    callbackURL: '/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
))

// Login with twitter.
passport.use(new TwitterStrategy({
    consumerKey: 'QOptfiy62L2XzqJlrVQ6lg',
    consumerSecret: 'lQm3h1bJJzyWxNTitKWf0lEdgdZvs2BVTtr2nrMq8',
    callbackURL: '/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    done(null, profile);
  }
));

passport.serializeUser(function(req, profile, done) {
  objects.people[req.sessionID] = profile
  done(null, req.sessionID);
});

passport.deserializeUser(function(id, done) {
  done(null, objects.people[id]);
});

app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }))

app.get('/auth/facebook', passport.authenticate('facebook'))
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }))
