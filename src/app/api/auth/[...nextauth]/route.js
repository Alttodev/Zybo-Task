import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Phone OTP",
      credentials: {
        phone: {},
        otp: {},
        name: {},
        isRegister: {},
      },
      async authorize(credentials) {
        try {
          if (!credentials.phone) return null;

          if (credentials.isRegister) {
            const registerRes = await axios.post(
              `${process.env.API_URL}/api/login-register/`,
              {
                phone_number: credentials.phone,
                name: credentials.name,
              },
              { headers: { "Content-Type": "application/json" } }
            );

            const userData = registerRes.data;

            return {
              id: userData.user_id,
              name: userData.name,
              phone: userData.phone_number,
              accessToken: userData.token.access,
            };
          }

          if (!credentials.otp) return null;

          const verifyRes = await axios.post(
            `${process.env.API_URL}/api/verify/`,
            {
              phone_number: credentials.phone,
              otp: credentials.otp,
            },
            { headers: { "Content-Type": "application/json" } }
          );

          const verifyData = verifyRes.data;

          return {
            id: verifyData.user_id,
            name: verifyData.name ?? null,
            phone: credentials.phone,
            accessToken: verifyData.token?.access ?? null,
            message: verifyData.message,
          };
        } catch (err) {
          console.error("Auth error:", err.response?.data || err.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          name: user.name,
          phone: user.phone,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
