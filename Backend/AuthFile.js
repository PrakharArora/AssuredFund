import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from "passport";
passport.use(new GoogleStrategy({
    clientID: '1077501959489-9vcuqo6r67qkmfgiv92tek3esvma3cr4.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5000/auth/google/callback",
    scope: ['profile', 'email'],
  },
        
        function (accessToken , refreshToken , profile ,  cb) {
                  cb(null , profile);               
    }

    ),
);

passport.serializeUser((user, done) => {
    done(null, user.id); // or user._id if you're using MongoDB
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });