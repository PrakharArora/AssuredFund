import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/Admin-route";
import movieRouter from "./routes/Movie-routes";
import bookingsRouter from "./routes/booking-routes";
import mailRouter from "./routes/Email-route";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from "passport-facebook";
import GoogleLogin from "./Models/GoogleLogin";
import Facebook from "./Models/Facebook";
import { newPayment, checkStatus } from './PhonePe-Gateway/Phone-Pe-Route';
import bodyParser from "body-parser";

const app = express();  
const clientid = "852485791520-gnlbc6cjpi9gdcf4ltnret14pcgan5f2.apps.googleusercontent.com";
const clientsecret = "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"




// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
};
app.use(cors(corsOptions));



// Session configuration
app.use(session({
    secret: "2478974mnbnsjhfw29842bnfks",
    resave: false,
    saveUninitialized: true,
}));

// Passport middleware
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: clientid,
    clientSecret: clientsecret,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
}, async (accessToken, refreshToken, profile, done) => {
    console.log("Profile:", profile);
    try {
        let user = await GoogleLogin.findOne({ googleId: profile.id });
        if (!user) {
            user = new GoogleLogin({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                image: profile.photos[0].value
            });
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


// Google Auth routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:5173",
    failureRedirect: "http://localhost:5173/SignIn"
}));
app.get("/login/success", async (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "User logged in", user: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
});
app.get("/GoogleLogout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error during logout");
        } else {
            res.redirect('http://localhost:5173');
        }
    });
});

// Facebook Login   

passport.use(new FacebookStrategy({
    clientID: '947669733381406',
    clientSecret: 'b1b57028bc78aeef8b27ecd93abd8d2b',
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: ['id', 'email', 'displayName', 'name', 'picture.type(large)']
}, async (accessToken, refreshToken, profile, done) => {
    console.log("Profile:", profile);
    try {
        let Facebookuser = await Facebook.findOne({ facebookId: profile.id });
        if (!Facebookuser) {
            const facebookName = profile.name.givenName + ' ' + profile.name.familyName;
            Facebookuser = new Facebook({
                facebookId: profile.id,
                displayName: facebookName, 
                email: profile.emails[0].value,
                picture: profile.photos[0].value
            });
            await Facebookuser.save();
        }
        return done(null, Facebookuser);
    } catch (error) {
        return done(error, null);
    }
}));


passport.serializeUser(function(Facebookuser , done) {
    done(null , Facebookuser.id);
});

passport.deserializeUser(function(id , done){
    return done(null , id)
})


app.get('/auth/facebook' , passport.authenticate('facebook' , {
    scope: 'email' 
    
}));

app.get('/auth/facebook/callback' , passport.authenticate('facebook' , {
    successRedirect:'http://localhost:5173',
    failureRedirect: '/failed'
}));
app.get("/login/facebook/success", async (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "User logged in", Facebookuser: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
});




// Other routes
app.use("/bookings", bookingsRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.post('/new-payment', newPayment);
app.get('/check-status', checkStatus);
app.use(mailRouter);

// MongoDB connection
mongoose.connect(`mongodb+srv://itsshiv777:shivam2001@cluster0.r0txsas.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(5000, () => {
            console.log('connected to the database');
        });
    }).catch((e) => {
        console.error(e);
    });

app.use("/", (req, res) => {
    res.send("Server is running");
});