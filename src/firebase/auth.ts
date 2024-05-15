import auth from '@react-native-firebase/auth';

export const signUp = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async () => {
      console.log('User account created & signed in!');
    })
    .then(() => {
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};

export const userLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // const test = await usersCollection.get();
  // console.log('userCollection', test);
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/invalid-credential') {
        console.log('유효하지 않은 사용자입니다.');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};

export const userLogout = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};