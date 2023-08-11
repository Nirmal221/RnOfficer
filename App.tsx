import 'react-native-gesture-handler';
import React from 'react';
import Root from './src/navigation';
import Toast from 'react-native-toast-message';
import { ToastAlert } from './src/components/ToastAlert';

function App(): JSX.Element {
  return (
    <>
      <Root />
      <Toast config={ToastAlert} />
    </>
  );
}
export default App;
