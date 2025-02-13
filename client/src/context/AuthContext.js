import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    token: '',
  });

  axios.defaults.baseURL = 'http://localhost:3000/api'

  useEffect(() => {
    const LoadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem('@auth');
      let LoginData = await JSON.parse(data);
      setState({...state,user:LoginData?.User,token:LoginData?.token});
    };
    LoadLocalStorageData();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
