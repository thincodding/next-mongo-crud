// Importing necessary modules
import connectDB from '../../../../config/database';
import User from "../../../../models/userModels";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Define NextAuth options
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // Connect to the database
          await connectDB();
          
          // Find the user
          const user = await User.findOne({ email });

          // Check if user exists and password matches
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return null; // Return null if authentication fails
          }

          // Return user object if authentication succeeds
          return user;
        } catch (error) {
          console.error("Error during authentication: ", error);
          return null; // Ensure to return null in case of error
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Define session strategy as JWT
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for NextAuth
  pages: {
    signIn: "/", // Custom sign-in page path
  },
};

// Create NextAuth handler
const handler = NextAuth(authOptions);

// Export handler for GET and POST requests
export { handler as GET, handler as POST };
