/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Index from './App/Main/index'

class PingAnJin extends Component {
  render() {
    return (
      <Index />
    );
  }
}

AppRegistry.registerComponent('PingAnJin', () => PingAnJin);
