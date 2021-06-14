import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectDatabase, verifyPassword } from "../../../utils";

export default NextAuth({
  session: { jwt: true },
  // we can add different profiles so the user can authenticate via several ways (ex credentials, magic link, google, facebook)
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { db, client } = await connectDatabase();

        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          client.close();
          // when an error is throw, by default nextjs redirects us to an error page
          // to prevent this, set redirect: false in client side
          throw new Error("No user found!");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        // this object will be encoded in jwt
        return {
          email: user.email,
        };
      },
    }),
  ],
});
