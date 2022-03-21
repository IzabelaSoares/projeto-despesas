import { useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { userContext } from './authContext';
import Login from './Login';
import { getUserEndpoint, IUser, signOutUserEndpoint } from './service';
import TableDespesas from './TableDespesas';

function App() {

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, () => setUser(null));
  }, []);

  function onLogOut() {
    signOutUserEndpoint();
    setUser(null);
  }
  if (user) {
    return (
      <userContext.Provider value={{ user, onSignOut: onLogOut }}>
        <BrowserRouter>
          <Routes>
            <Route path="/despesas/:anoMes" element={<TableDespesas />} />
            <Route path="/" element={<Navigate to="/despesas/2021-06" />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    )
  }
  return <Login onSignIn={setUser} />
}

export default App;
