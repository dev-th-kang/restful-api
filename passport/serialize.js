const passport = require("passport");
passport.serializeUser((user,done)=>{
    console.log(`${user.username} session save`);
    done(null, user);
});
passport.deserializeUser((user,done)=>{
    console.log(`${user.username} session get`);
    done(null, user);
});

module.exports =passport;