import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { getUserByEmail } from "@/shared/database/services/user";
import { omit } from "lodash";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          const user = await getUserByEmail(credentials.email);

          if (!user) {
            return null;
          }

          const isPasswordCorrect = await compare(
            credentials.password,
            user.hashedPassword
          );

          if (isPasswordCorrect) {
            return {
              id: user.id,
              email: user.email,
            };
          }

          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await getUserByEmail(session?.user?.email as string);
      session.user = { ...session.user, ...omit(user, "hashedPassword") };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
