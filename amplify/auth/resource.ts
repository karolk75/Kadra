import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Witaj w Kadrze! Zweryfikuj swój kod!",
      verificationEmailBody: (code) => `Tu jest twój kod: ${code()}`,
      verificationEmailStyle: "CODE",
    },
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: true,
    },
    familyName: {
      mutable: true,
      required: true,
    },
    phoneNumber: {
      mutable: true,
      required: true,
    },
  },
});
