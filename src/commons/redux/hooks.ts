import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { AppDispatch, AppThunkDispatch, RootState } from './types';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppThunkDispatch: () => AppThunkDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = <T>(
  fn: (state: RootState) => T,
): T => useSelector(fn, shallowEqual);
