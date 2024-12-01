import SearchBar from "./Components/SearchBar";
import {useSpotifyToken} from './Components/GetToken';

import styles from './App.module.css';

function App() {
  const token = useSpotifyToken();

  return (
    <div className={styles.container}>
      <SearchBar token={token}/>
    </div>
  );
}

export default App;
