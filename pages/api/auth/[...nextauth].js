import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'


const options = {
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET

        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET

        })
    ],

    database:process.env.MONGODB_URI
}

export default (req, res) => NextAuth(req, res, options)