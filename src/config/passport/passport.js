
import local from 'passport-local'
import passport from 'passport'
import crypto from 'crypto'
import GithubStrategy from 'passport-github2'
import { userModel } from '../../models/user.js'
import { createHash, validatePassword } from '../../utils/bcrypt.js'
import { strategyJWT } from './strategies/jwtStrategy.js'


//Passport: Me permite a mi tener de una forma muy sencilla en un solo archivo de configuracion todas las estrategias de autenticacion que yo necesite(Datos Biometricos, Redes Sociales, Etc...)
//Paso1: Definir nombre de estrategia = ('register'), paso2: 
//Passport trabaje con uno o mas middlewares (localStrategy) se implementa para lo que seria User y password normal(es la mas simple), paso3: luego viene la misma logica que hice para registros de usuarios LINE 17-27
const localStrategy = local.Strategy

const initializePassport = () => {
    //Definir en que rutas se aplican mis estrategias

    passport.use('register', new localStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        try {
            const { first_name, last_name, email, password, age } = req.body
            const findUser = await userModel.findOne({ email: email })
            if (findUser) {
                return done(null, false)
            } else {
                const user = await userModel.create({ first_name: first_name, last_name: last_name, email: email, age: age, password: createHash(password) })
                return done(null, user)
            }
        } catch (e) {
            return done(e)
        }
    }))


        //1.Genera, Inicializar la sesion del usuario
        passport.serializeUser((user, done) => {
            done(null, user._id)
        })
    
        //2.Elimina, Eliminar la sesion del usuario
        passport.deserializeUser(async (id, done) => {
            const user = await userModel.findById(id)
            done(null, user)
        })

        passport.use('login', new localStrategy({ usernameField: 'email' }, async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username }).lean()
                if (user && validatePassword(password, user.password)) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (e) {
                return done(e)
            }
        }))
        /*
        passport.use('github', new GithubStrategy({
            clientID: "f288376221da65359440",
            clientSecret: "e3db4a49507e03564eecf31694bf19f85382411d",
            callbackURL: "http://localhost:4000/api/session/githubSession"
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({ email: profile._json.email }).lean()
                if (user) {
                    done(null, user)
                } else {
                    const randomNumber = crypto.randomUUID()
                    console.log(profile._json)
                    const userCreated = await userModel.create({ first_name: profile._json.name, last_name: ' ', email: profile._json.email, age: 18, password: createHash(`${profile._json.name}`) })
                    console.log(randomNumber)
                    return done(null, userCreated)
                }
            } catch (error) {
                return done(error)
            }
        }))
        */
        passport.use('jwt', strategyJWT)

}
    export default initializePassport