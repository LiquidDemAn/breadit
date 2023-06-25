import {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {db} from '../lib/db'
import {PathsEnum} from "@/configs/constants";
import GoogleProvider from 'next-auth/providers/google'
import {nanoid} from "nanoid";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: PathsEnum.SIGNIN
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                // @ts-ignore
                session.user.id = token.id
                // @ts-ignore
                session.user.name = token.name
                // @ts-ignore
                session.user.email = token.email
                // @ts-ignore
                session.user.image = token.picture
                // @ts-ignore
                session.user.username = token.username
            }

            return session
        },
        async jwt({token, user}) {
            const dbUser = await db.user.findFirst({where: {email: token.email}})

            if(!dbUser) {
                token.id = user!.id
                return token
            }

            if(!dbUser.username) {
                await db.user.update(({where: {
                    id: dbUser.id
                    },
                    data: {
                        username: nanoid(10)
                    }
                }))
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                username: dbUser.username,
            }
        },
        redirect() {
            return PathsEnum.HOME
        }
    },
}