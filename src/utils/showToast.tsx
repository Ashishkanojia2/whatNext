import Toast from 'react-native-toast-message';
interface ShowToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  statuscode?: number;
}
const showToast = (props: ShowToastProps) => {
  Toast.show({
    type: props.type || 'info',
    text1: props.type,
    text2: props.message,
    visibilityTime: 5000,
    avoidKeyboard: true,
    position: 'bottom',
    swipeable: true,
    bottomOffset: 100
    
  });
};
export default showToast;
