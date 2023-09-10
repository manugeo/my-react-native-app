import Toast from 'react-native-root-toast';

export const isValidEmail = (text = '') => {
  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return !!(text.match(emailRegEx));
}

export const showToast = (meassage) => {
  const options = {
    duration: Toast.durations.LONG,
    position: -54,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  };
  // Add a Toast on screen.
  Toast.show(meassage, options);
};