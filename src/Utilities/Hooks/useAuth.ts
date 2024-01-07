import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser} from '@Redux/Actions/UserAction';
import {IRootStateType} from '@Redux/Store';
import {resetUser} from '@Redux/Reducers/UserReducer';
import {toast} from '@backpackapp-io/react-native-toast';

type IAuthHookReturn = {
  auth: boolean;
  token: string | null;
  isExpired?: boolean;
};
/**
 * Custom Auth hook
 * @returns auth | auth status
 * @returns token | user token
 * @returns isExpired | signal if user auth is expired
 */
export default (): IAuthHookReturn => {
  const dispatch = useDispatch<any>();
  const user = useSelector((state: IRootStateType) => state.user);

  const [authenticated, setAuthenticated] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    //trigger fetch user to verify token validity from server
    if (user.token !== null) {
      dispatch(fetchUser());
    }
  }, [user.token]);

  useEffect(() => {
    const errCode = user.error?.error.code;

    //handle user authenticated status
    if (user.token && user.userData) {
      setAuthenticated(true);
      setIsExpired(false);
    } else {
      setAuthenticated(false);
    }

    if (user.status === 'error' && +errCode === 108) {
      setIsExpired(true);
      dispatch(resetUser());
      toast.error('Sesi telah berakhir, silahkan login kembali');
    }
  }, [user.status]);
  return {
    auth: authenticated,
    token: user.token,
    isExpired: isExpired,
  };
};
