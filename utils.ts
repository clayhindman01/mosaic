export const errorMessageMap = new Map([
    [
      "FirebaseError: Firebase: Error (auth/invalid-email).",
      "Must be a valid email",
    ],
    [
      "FirebaseError: Firebase: Error (auth/missing-password).",
      "Password cannot be blank",
    ],
    [
      "FirebaseError: Firebase: Error (auth/wrong-password).",
      "Wrong password. Please try again or",
    ],
    [
      "FirebaseError: Firebase: Error (auth/user-not-found).",
      "Wrong password. Please try again or",
    ],
    [
      "FirebaseError: Firebase: Error (auth/network-request-failed).",
      "Something went wrong. Please try again",
    ],
    [
      "[AxiosError: Network Error]",
      "Something went wrong. Please try again later",
    ],
  ]);

  export const setOpacity = (hex: string, alpha: number) =>
  `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;