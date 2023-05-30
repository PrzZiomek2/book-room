import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
   secret: process.env.NEXTAUTH_SECRET,
   session: {
      strategy: "jwt",
      jwt: true,
      maxAge: 30 * 24 * 60 * 60
   },
   providers:[
      CredentialsProvider({
         type: "credentials",
         credentials: { 
            email: { label: "Email", type: "email" },
            password: { label: "Hasło", type: "password" },
         },
         async authorize(credentials, req) { 
            const {email, password} = credentials;
            if(email !== "ka@wp.pl" || password !== "ata"){
               return null;
            }

            return {name: "pe ziom", email: "ka@wp.pl"}
         }
       })
   ],
   callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        return true;
      },
      async redirect({ url, baseUrl }) {
        return `http://localhost:3000/`
      },
    },
   pages: {
     // signIn: "/auth/login",
      error: "/auth/error"
   }
};

export default NextAuth(authOptions);