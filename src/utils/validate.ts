export const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  if (!regex.test(email)) throw new Error('이메일 형식에 맞지 않습니다.');

  return true;
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};