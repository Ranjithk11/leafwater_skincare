import { JWT } from "next-auth/jwt";
import { API_ROUTES } from "../routes/apiRoutes";
import { Session, User } from "next-auth";

interface UserLoginPayload {
  phoneNumber: string;
  onBoardingQuestions: any[];
  name: string;
  email: string;
}
export const saveUser = async (payload: UserLoginPayload) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.SAVE_USER}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber: payload.phoneNumber,
        onBoardingQuestions: payload.onBoardingQuestions,
        name: payload.name,
        email: payload.email,
      }),
    }
  );

  const data = await response.json();
  return data;
};

export const updateToken = (token: JWT, user: User) => {
  if (token) {
    token.id = user.id;
    token.name = user?.firstName + " " + user?.lastName;
    token.email = user?.email;
    token.mobileNumber = user?.mobileNumber;
    token.firstName = user?.firstName;
    token.lastName = user?.lastName;
    token.isEmailVerified = user?.isEmailVerified;
    token.isProfileCompleted = user?.isProfileCompleted;
    token.dateOfBirth = user?.dateOfBirth;
    token.gender = user?.gender;
    token.onBoardingQuestions = user?.onBoardingQuestions;
    token.selfyImage = user?.selfyImage;
    token.selfyImagePath = user?.selfyImagePath;
    token.skinType = user?.skinType;
  }
  return token;
};

export const updateSession = (session: Session, token: JWT) => {
  if (token) {
    session.user.id = token?.id as string;
    session.user.name = token?.firstName + " " + token?.lastName;
    session.user.firstName = token?.firstName as string;
    session.user.lastName = token?.lastName as string;
    session.user.mobileNumber = token?.mobileNumber as string;
    session.user.email = token?.email as string;
    session.user.gender = token?.gender as string;
    session.user.isEmailVerified = token?.isEmailVerified as boolean;
    session.user.isProfileCompleted = token?.isProfileCompleted as boolean;
    session.user.onBoardingQuestions = token?.onBoardingQuestions as any[];
    session.user.selfyImage = token?.selfyImage as string;
    session.user.selfyImagePath = token?.selfyImagePath as string;
    session.user.skinType = token?.skinType as string;
  }
  return session;
};
