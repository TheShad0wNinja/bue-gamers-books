import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * @type {NextAuthOptions}
 */
const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        studentId: {
          type: "text",
          label: "Student ID",
          placeholder: "Student ID",
        },
        teamName: {
          type: "text",
          label: "Team/User Name",
          placeholder: "Name",
        },
      },
      async authorize(credentials, req) {
        const { studentId, teamName } = credentials;

        const check = await fetch(`${req.headers.origin}/api/user`, {
          method: "POST",
          body: JSON.stringify({ studentId, teamName }),
        }).then((r) => r.json());

        if (!check.valid) throw new Error("Invalid user info");
        return {
          studentId,
          teamName,
        };
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/login",
  // },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
