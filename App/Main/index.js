/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Navigator
} from 'react-native';

import Main from './main'

export default class Index extends Component {
  render() {
    return (
      <Navigator
          initialRoute={{ name: 'goldBean', component: Main }}
          configureScene={(route) => {
            return Navigator.SceneConfigs.FadeAndroid
          } }
          renderScene={(route, navigator) => {
            let Component = route.component
            return <Component {...route.params} navigator={navigator} />
          } }/>
    );
  }
}