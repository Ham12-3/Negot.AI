import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/user.model";

// IMPORTANT: The callbackURL must EXACTLY match what's in Google Console
const CALLBACK_URL = "https://negot-ai.onrender.com/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: CALLBACK_URL,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails![0].value,
            displayName: profile.displayName,
            profilePicture: profile.photos![0].value,
          });
        }

        done(null, user);
      } catch (error) {
        console.error("Google Strategy Error:", error);
        done(error as Error, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Deserialize Error:", error);
    done(error, null);
  }
});
