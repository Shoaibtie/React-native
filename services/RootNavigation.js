// RootNavigation.js

import * as React from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  console.log('params', navigationRef);
  navigationRef.current?.navigate(name, params);
}

export function push(...args) {
  // alert('hi');
  console.log('args====>', args);
  console.log('params', navigationRef);
  navigationRef.dispatch(StackActions.push(args));
}
