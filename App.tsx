import 'react-native-gesture-handler';
import React from 'react';
import Root from './src/navigation';
import Toast from 'react-native-toast-message';
import { ToastAlert } from './src/components/ToastAlert';
import AppContext from './src/AppContext/AppContext';

function App(): JSX.Element {
  return (
    <AppContext>
      <Root />
      <Toast config={ToastAlert} />
    </AppContext>
  );
}
export default App;
