/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import reactotronSaga from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';
import { HOST_URL } from 'react-native-dotenv';

if (__DEV__) {
  const tron = Reactotron.configure({ host: HOST_URL })
    .useReactNative()
    .use(reactotronSaga())
    .use(reactotronRedux())
    .connect();

  tron.clear();

  console.tron = tron;
}
