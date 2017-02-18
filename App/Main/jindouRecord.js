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
    Dimensions
} from 'react-native';
import ScalableText from 'react-native-text';

import TopBar from '../Common/topBar'
import RecordCell from '../Common/recordCell'
import { fitWidth, fitHeight } from '../Utils/fitImageSize'

const {width, height} = Dimensions.get('window')

export default class jindouRecord extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                {/*顶部区域*/}
                <TopBar navigator={this.props.navigator} right={{ type: '图片' }} />
                {/*记录区域*/}
                <View style={{backgroundColor:'#fff'}}>
                    <View style={styles.record}>
                        <Image style={{ marginLeft: fitWidth(18), marginRight: fitWidth(5), height: fitHeight(30) }} source={require('../Image/jindoudou@2x.png')} resizeMode='stretch' />
                        <ScalableText style={styles.recordTitle}>金豆记录</ScalableText>
                    </View>
                    <View style={styles.recordContent}>
                        <View style={styles.recordLeftContent}></View>
                        <View style={styles.recordRightContent}>
                            <RecordCell recordIcon={require('../Image/yundong@2x.png')} recordText='运动赚金豆' date='2016-12-22' bean='+30' />
                            <RecordCell recordIcon={require('../Image/tuceng-2@2x.png')} recordText='摇一摇签到' date='2016-12-22' bean='+40'  addStyle={{borderTopWidth: 1 / PixelRatio.get(),borderBottomWidth: 1 / PixelRatio.get(),borderColor: 'rgb(208,165,46)'}}/>
                            <RecordCell recordIcon={require('../Image/lianjin@2x.png')} recordText='炼金抽奖' date='2016-12-22' bean='-1000' />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    record: {
        flexDirection: 'row',
        alignItems: 'center',
        width: fitWidth(210),
        height: fitHeight(60),
        paddingLeft: 2,
        borderTopWidth: 1 / PixelRatio.get(),
        borderRightWidth: 1 / PixelRatio.get(),
        borderLeftWidth: 1 / PixelRatio.get(),
        borderColor: 'rgb(208,165,46)',
        marginTop: fitHeight(2),
        marginLeft: fitWidth(30)
    },
    recordTitle: {
        fontSize: 16,
        color: 'rgb(208,165,46)',
    },
    recordContent: {
        flexDirection: 'row',
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: 'rgb(208,165,46)',    
        backgroundColor: 'rgb(242,242,242)'            
    },
    recordLeftContent: {
        width: fitWidth(30),
    },
    recordRightContent: {
        flex: 1,
        borderLeftWidth: 1 / PixelRatio.get(),
        borderColor: 'rgb(208,165,46)'
    },
});