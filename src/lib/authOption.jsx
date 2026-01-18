import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/actions/server/auth";
import { collections, dbConnect } from "@/lib/dbConnect";
// import { collections } from "@/lib/collections";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    // =======================
    // Credentials Provider
    // =======================
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) {
          return null;
        }

        // must return user object
        return user;
      },
    }),

    // =======================
    // Google Provider
    // =======================
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // =======================
    // SIGN IN CALLBACK
    // =======================
    async signIn({ user, account }) {
      // Credentials login → DB insert লাগবে না
      console.log(account);
      if (account?.provider === "credentials") {
        return true;
      }

      // Google login → DB check
      const usersCollection = dbConnect(collections.USERS);

      const isExist = await usersCollection.findOne({
        email: user.email,
      });

      if (isExist) {
        return true;
      }

      const newUser = {
        provider: account.provider,
        email: user.email,
        name: user.name,
        image: user.image,
        role: "user",
        createdAt: new Date(),
      };

      const result = await usersCollection.insertOne(newUser);
      return result.acknowledged;
    },

    // =======================
    // JWT CALLBACK
    // =======================
    async jwt({ token, user, account }) {
      // first time login
      if (user) {
        if (account?.provider === "google") {
          const usersCollection = dbConnect(collections.USERS);
          const dbUser = await usersCollection.findOne({
            email: user.email,
          });

          token.role = dbUser?.role || "user";
          token.email = dbUser?.email;
        } else {
          // credentials login
          token.role = user.role;
          token.email = user.email;
        }
      }

      return token;
    },

    // =======================
    // SESSION CALLBACK
    // =======================
    async session({ session, token }) {
      if (token) {
        session.role = token?.role;
        session.email = token?.email;
      }
      return session;
    },
  },
};
