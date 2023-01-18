import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = <T>(
  fn: (state: RootState) => T,
): T => useSelector(fn, shallowEqual);
