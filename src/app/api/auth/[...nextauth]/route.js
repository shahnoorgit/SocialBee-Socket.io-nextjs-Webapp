import connectBD from "@/Database/connectdb";
import User from "@/model/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { name, image, email } = user;
      await connectBD();
      try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          const newUser = new User({
            name,
            image,
            email,
            posts: [],
            liked: [],
          });
          await newUser.save();
          user = newUser;
          return true;
        }
        return user;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, user }) {
      const existingUser = await User.findOne({ email: session.user.email });
      if (existingUser) {
        session.dbuser = existingUser;
        return session;
      }
      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };
