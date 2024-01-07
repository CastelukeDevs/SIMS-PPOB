import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser} from '@Redux/Actions/UserAction';
import {IRootStateType} from '@Redux/Store';

type IAuthHookReturn = {
  auth: boolean;
  token: string | null;
};
/**
 * Custom Auth hook
 * @returns
 */
export default (): IAuthHookReturn => {
  const dispatch = useDispatch<any>();
  const user = useSelector((state: IRootStateType) => state.user);

  useEffect(() => {
    if (user.token === null && user.status === 'idle') dispatch(fetchUser());
  }, [user]);
  return {
    auth: user.userData !== null && user.token !== null,
    token: user.token,
  };
};
