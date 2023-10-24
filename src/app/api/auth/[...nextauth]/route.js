import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Function to fetch appointment data by ID
const getUser = async (Email) => {
  console.log("Fetching User from Email:", Email);
  try {
    const res = await fetch(
      `http://localhost:3000/api/singleuser?Email=${Email}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch the email");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading user", error);
    return null; // Return null in case of error
  }
};

const getDoctor = async (UserID) => {
  console.log("Fetching User from UserID:", UserID);
  try {
    const res = await fetch(
      `http://localhost:3000/api/singledoctor?UserID=${UserID}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch doctor");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading user", error);
    return null; // Return null in case of error
  }
};

const getPatient = async (UserID) => {
  console.log("Fetching User from UserID:", UserID);
  try {
    const res = await fetch(
      `http://localhost:3000/api/singlepatient?UserID=${UserID}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch the email");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading user", error);
    return null; // Return null in case of error
  }
};

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "creds",
      credentials: {
        email: { label: "Email", placeholder: "patient@luxecare.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        const user = await getUser(credentials.email);
        console.log("Email=", user[0][1]);
        if (user && user[0][2] === credentials.password) {
          // Depending on the user's role, load additional information from the appropriate table
          let additionalUserData;
          if (user[0][3] === "doctor") {
            additionalUserData = await getDoctor(user[0][0]); // Load doctor data
            console.log(additionalUserData);
          } else if (user[0][3] === "patient") {
            additionalUserData = await getPatient(user[0][0]); // Load patient data
          }

          if (additionalUserData) {
            const userObj = {
              id: additionalUserData[0][1],
              firstName: additionalUserData[0][2],
              lastName: additionalUserData[0][3],
              role: user[0][3],
              email: user[0][1],
            };
            console.log("Returning user object:", userObj); // Add this console log
            return userObj;
          } else {
            const userObj = {
              role: user[0][3],
              email: user[0][1],
            };
            return userObj;
          }
        }
        console.log("Authentication failed. Returning null.");
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ user = {}, token }) {
      if (user.id) {
        token.id = user.id;
      }
      if (user.firstName) {
        token.firstName = user.firstName;
      }
      if (user.lastName) {
        token.lastName = user.lastName;
      }
      if (user.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.role = token.role;
      return session;
    },
    async onSignout() {
      return { url: "/" };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
