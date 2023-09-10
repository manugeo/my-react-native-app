import { RootSiblingParent } from 'react-native-root-siblings';
import Main from './src/components/Main';

export default function App() {
  return (
    <RootSiblingParent>
      <Main />
    </RootSiblingParent>
  );
}
