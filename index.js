import { registerRootComponent } from 'expo';
import App from './App';

export default function Main() {
  return <App />;
}

registerRootComponent(Main);
