import { useDispatch } from 'react-redux';
import type {  AppDispatch } from '../index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
