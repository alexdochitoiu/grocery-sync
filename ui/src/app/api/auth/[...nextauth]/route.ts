import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import getDynamoDBDocClient from "../../getDynamoDBDocClient";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const docClient = getDynamoDBDocClient();

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
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const command = new GetCommand({
          TableName: "users",
          Key: {
            email: credentials.email,
          },
        });

        try {
          const response = await docClient.send(command);
          const user = response.Item;

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
      // TODO: Fetch user data from the database
      session.user = { ...session.user, id: "test" };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
