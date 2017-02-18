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
    Image,
    TouchableOpacity,
    PixelRatio,
    BackAndroid,
    Platform
} from 'react-native';
import ScalableText from 'react-native-text';

import { fitWidth, fitHeight } from '../Utils/fitImageSize'

export default class TopBar extends Component {
    constructor(props) {
        super(props)
    }
    _goFrontPage() {
        const { navigator } = this.props
        if (navigator) {
            navigator.pop()
        }
    }
    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid.bind(this)); //必须绑定this,否则_onBackAndroid中拿不到 this.props
    }
    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._onBackAndroid.bind(this));
    }
    _onBackAndroid() {
        const { navigator } = this.props
        const routers = navigator.getCurrentRoutes()
        if (routers.length > 1) {
            navigator.pop()
            return true //接管默认行为
        } else {
            return false //默认行为
        }
    }
    render() {
        return (
            <View style={styles.topBar} >
                <View style={styles.topBarContent}>
                    <TouchableOpacity onPress={() => this._goFrontPage()}>
                        <Image source={require('../Image/fanhui@2x.png')} style={{ height: fitHeight(40) }} resizeMode='stretch' />
                    </TouchableOpacity>
                    {this._renderTopTitle(this.props.topTitle)}
                    {this._renderRight(this.props.right)}
                </View>
            </View>
        );
    }
    _renderTopTitle(topTitle) {
        return (
            topTitle ? (
                <ScalableText style={{ fontSize: 19, color: 'rgb(208,165,46)' }}>{topTitle}</ScalableText>
            ) : null
        )
    }
    _renderRight(right) {
        return (
            right.type === '图片' ? (
                <TouchableOpacity onPress={() => { alert('平安金') } }>
                    <Image source={require('../Image/fenxiang@2x.png')} style={{ height: fitHeight(40) }} resizeMode='stretch' />
                </TouchableOpacity>
            ) : (
                    <TouchableOpacity onPress={() => { alert(right.content) } }>
                        <ScalableText style={{ fontSize: 14, color: 'rgb(208,165,46)' }}>{right.content}</ScalableText>
                    </TouchableOpacity>
                )
        )
    }
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: Platform.OS === 'ios' ? fitHeight(128) : fitHeight(88)
    },
    topBarContent: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: fitHeight(30),
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? fitHeight(40) : fitHeight(0),
    }
});
