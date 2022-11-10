export const generateOtpCode = () =>
  Math.floor(Math.random() * (9998 - 1001 + 1) + 1001);
