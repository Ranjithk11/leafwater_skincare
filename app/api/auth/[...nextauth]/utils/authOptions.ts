import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { saveUser, updateSession, updateToken } from "@/redux/api/authApi";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (credentials: any, _req) => {
        let response: any = {};
        response = await saveUser({
          phoneNumber: credentials?.phoneNumber,
          name: credentials?.name,
          email: credentials?.email,
          onBoardingQuestions: JSON.parse(credentials?.onBoardingQuestions),
        });

        return {
          id: response?.data?._id,
          mobileNumber: response?.data?.phoneNumber,
          onBoardingQuestions: response?.data?.onBoardingQuestions,
          name: response?.data?.name,
          firstName: response?.data?.name,
          lastName: "",
          email: response?.data?.email,
          isEmailVerified: false,
          isProfileCompleted: false,
          gender: "",
        };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token = updateToken(token, user);
      }
      if (trigger === "update") {
        if (session) {
          token = updateToken(token, session?.user);
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session = updateSession(session, token);
      }
      return session;
    },
  },
};

export default authOptions;
