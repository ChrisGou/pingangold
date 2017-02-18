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
    Platform,
    Image,
    TouchableOpacity,
    PixelRatio,
    Dimensions
} from 'react-native';
import ScalableText from 'react-native-text';
import JindouRecord from '../Main/jindouRecord'

import Lianjin from '../Main/lianjin'
import { fitWidth, fitHeight } from '../Utils/fitImageSize'

const {width, height} = Dimensions.get('window')

export default class PersonalInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: this.props.avatar ? this.props.avatar : require('../Image/kobe.png'), //头像url
            username: this.props.username ? this.props.username : '＊书阁',
            progress: this.props.progress ? this.props.progress : 300,
            totalProgress: this.props.totalProgress ? this.props.totalProgress : 1000,
        }
    }
    render() {
        return (
            <View style={[styles.container, this.props.addStyles]}>
                <View style={styles.leftCell}>
                    <TouchableOpacity onPress={() => this._goNextPage(JindouRecord)}>
                        <Image source={this.state.avatar} style={styles.avatar} />
                    </TouchableOpacity>
                    <View style={styles.progress}>
                        <View style={[styles.current, { flex: 20 }]}></View>
                        <View style={[styles.other, { flex: 80 }]}></View>
                        <ScalableText style={styles.progressText}>{this.state.progress}/{this.state.totalProgress}</ScalableText>
                    </View>

                </View>
                <View style={styles.rightCell}>
                    <TouchableOpacity onPress={() => this._goNextPage(Lianjin)} style={{ alignItems: 'center' }}>
                        <Image source={require('../Image/lianjin@2x.png')} style={{ width: fitWidth(40), height: fitHeight(40) }} />
                        <ScalableText style={[styles.infoFont, { marginTop: fitHeight(3) }]}>炼金</ScalableText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _goNextPage(component) {
        const { navigator } = this.props
        if (navigator) {
            navigator.push({
                name: '详情页',
                component: component,
            })
        }
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: fitWidth(35),
        paddingVertical: fitHeight(20)
    },
    leftCell: {
        flexDirection: 'row'
    },
    rightCell: {
    },
    avatar: {
        width: fitWidth(60),
        height: fitHeight(60),
        borderWidth: 1,
        borderRadius: fitWidth(60) / 2,
        borderColor: 'rgb(208,165,46)'
    },
    infoFont: {
        fontSize: 12,
        color: 'rgb(208,165,46)'
    },
    progress: {
        // flex: 1,
        marginTop:fitHeight(12),
        flexDirection: 'row',
        width: fitWidth(180),
        height: fitHeight(30),
        borderRadius: fitHeight(30) / 2,
        backgroundColor: 'rgb(208,165,46)',
    },
    progressText: {
        position: 'absolute',
        width: fitWidth(180),
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        marginTop: Platform === 'ios' ? fitHeight(2) : 0,
        fontSize: 10,
        color: 'red',
    },
    current: {
        borderRadius: fitHeight(30) / 2,
        backgroundColor: 'rgb(208,165,46)',
    },
    other: {
        borderTopRightRadius: fitHeight(30) / 2,
        borderBottomRightRadius: fitHeight(30) / 2,
        backgroundColor: '#fff',
    },
});