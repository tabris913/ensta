import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

export interface IStoreState {}

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
  });
