import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyProfileQuery } from "../app/modules/auth/auth.api";
import { setProfile } from "../app/modules/auth/auth.slice";

const useProfile = () => {
  const profile = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [getProfile, { data, isLoading, error }] = useLazyProfileQuery();

  const refetchProfile = async () => {
    await getProfile();
  };
  useEffect(() => {
    if (data == null || data === undefined) return;
    dispatch(setProfile(data.data));
  }, [data, dispatch]);

  const getAndRefetchProfile = async () => {
    await getProfile();
    return profile;
  };

  return { profile, refetchProfile, getAndRefetchProfile };
};

export default useProfile;
