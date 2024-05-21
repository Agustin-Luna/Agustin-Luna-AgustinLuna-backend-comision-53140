import passport from 'passport'
import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import { getUserById, getUserEmail, userRegistro } from '../services/user.js'
import { createHash, isValidPassword } from '../utils/bcryptPassword.js'


const localStrategy = local.Strategy

export const initializaPassport  = () => {

    passport.use('registro', new localStrategy(
        {
            passReqToCallback: true, // Corrected capitalization
            usernameField: 'email'
        },
        async (req, username, password, done) => { // Corrected parameter order
            try {
                const { confirmPassword } = req.body;
                if (password !== confirmPassword) {
                    console.log('Las contraseñas no coinciden');
                    return done(null, false, { message: 'Passwords do not match' });
                }
    
                const user = await getUserEmail(username);
                if (user) {
                    console.log('Usuario existente');
                    return done(null, false, { message: 'User already exists' });
                }
    
                req.body.password = createHash(password);
                const newUser = await userRegistro({ ...req.body }); // Ensure userRegistro is awaited
    
                if (newUser) {
                    return done(null, newUser);
                }
    
                return done(null, false, { message: 'User registration failed' });
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('login', new localStrategy (
        { usernameField: 'email'}, 
        async(username, password, done) =>{
            try {
                const user = await getUserEmail(username)

                if(!user){
                    console.log('el usuario no existe')
                    done(null,false)
                }

                if(!isValidPassword(password, user.password)){
                    console.log('las pasword no coinciden')
                    return done(null,false)
                }
                return done(null,user)
            } catch (error) {
                done(error)
            }
        }))

        passport.serializeUser((user, done) =>{
            done(null, user._id)
        })

        passport.deserializeUser(async (id, done) =>{
            const user = await getUserById(id)
            done(null,user)
        })

        passport.use('github', new GithubStrategy(
            {
                clientID: 'Iv23liVxI7xECk3M9GlH',
                clientSecret: 'ae131783e88363ede818c829ba95bca28ca1a600',
                callbackURL: 'http://localhost:8080/callbackGithub'
            },
            async(accessToken, refreshToken, profile, done) =>{
                try {
                    const email = profile._json.email
                    const user = await getUserEmail(email)
                    if(user)
                        return done(null, user)

                    const newUser = {
                        name: profile._json.name,
                        email,
                        password: '.$',
                        image:profile._json.avatar_url,
                        github:true
                    }
                    const result = await userRegistro({...newUser})
                    return done(null,result)
                } catch (error) {
                    done(error)
                }
            }))

}