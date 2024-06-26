import passport from 'passport'
import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import { UserRepo } from '../repositories/index.js'
import { createHash, isValidPassword } from '../utils/bcryptPassword.js'
import 'dotenv/config'


const localStrategy = local.Strategy

export const initializaPassport  = () => {

    passport.use('registro', new localStrategy(
        {
            passReqToCallback: true, 
            usernameField: 'email'
        },
        async (req, username, password, done) => { 
            try {
                const { confirmPassword } = req.body;
                if (password !== confirmPassword) {
                    console.log('Las contraseñas no coinciden');
                    return done(null, false, { message: 'Passwords do not match' });
                }
    
                
                const user = await UserRepo.getUserByEmail(username);

                if (user) {
                    console.log('Usuario existente');
                    return done(null, false, { message: 'User already exists' });
                }
    
                req.body.password = createHash(password);
                
                const newUser = await UserRepo.userRegistro({ ...req.body });
    
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
                
                const user = await UserRepo.getUserByEmail(username);

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
            
            const user = await UserRepo.getUserById(id)
            done(null,user)
        })

        passport.use('github', new GithubStrategy(
            {
                clientID:  process.env.client_ID ,
                clientSecret: process.env.client_Secret,
                callbackURL: process.env.callback_URL
            },
            async(accessToken, refreshToken, profile, done) =>{
                try {
                    const email = profile._json.email
                    
                    const user = await UserRepo.getUserByEmail(email)
                    if(user)
                        return done(null, user)

                    const newUser = {
                        name: profile._json.name,
                        email,
                        password: '.$',
                        image:profile._json.avatar_url,
                        github:true
                    }
                    
                    const result = await UserRepo.userRegistro({...newUser})
                    return done(null,result)
                } catch (error) {
                    done(error)
                }
            }))

}