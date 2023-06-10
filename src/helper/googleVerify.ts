import { OAuth2Client, TokenPayload } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleVerify = async (token: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, picture, email } = ticket.getPayload() as TokenPayload;
    
    return { name, picture, email };
  } catch (error) {
    throw new Error(error as string);
  }
};
