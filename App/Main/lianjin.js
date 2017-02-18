/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    PixelRatio,
    Animated,
    ScrollView,
    BackAndroid,
    Platform,
    Dimensions
} from 'react-native';
import ScalableText from 'react-native-text';

import TopBar from '../Common/topBar'
import PersonalInfo from '../Common/personalInfo'
import RecordCell from '../Common/recordCell'
import Detail from './detail'
import PinganjinList from '../Common/pinganjinList'
import PajButton from '../Common/pajButton'

import { fitWidth, fitHeight } from '../Utils/fitImageSize'
const {width, height} = Dimensions.get('window')

export default class Lianjin extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                {/*顶部区域*/}
                <TopBar navigator={this.props.navigator} right={{ content: '炼金记录' }} />
                

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    middle: {
        flex: 1
    },
    dise: {
        width: width,
        height: fitHeight(596)
    },
    role: {
        position: 'absolute',
        top: fitHeight(20),
        left: fitWidth(30),
    },
    gaizi: {
        zIndex: 3,
        alignSelf: 'center',
        bottom: fitHeight(-130),
        width: fitWidth(231),
        height: fitHeight(188)
    },
    lianjinlu: {
        zIndex: 2,
        alignSelf: 'center',
        top: fitHeight(-70),
        width: fitWidth(351),
        height: fitHeight(551)
    },
    huomiao: {
        zIndex: 3,
        width: fitWidth(750),
        height: fitHeight(1336)
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        paddingTop: fitHeight(40)
    },
    fontText: {
        fontSize: 14,
        color: 'rgb(50,50,50)'
    },
    numText: {
        fontSize: 21,
        color: 'rgb(50,50,50)'
    }
})