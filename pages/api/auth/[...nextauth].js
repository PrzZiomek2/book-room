import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
   session: {
      strategy: "jwt"
   },
   providers:[
      CredentialsProvider({
         type: "credentials",
         credentials: { 
            email: { label: "Email", type: "email" },
            password: { label: "password", type: "password" },
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
   pages: {
   //   signIn: "/auth/login",
   //   signOut: "/auth/logout",
      error: "/auth/error"
   }
};

export default NextAuth(authOptions);