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

import { fitWidth, fitHeight } from '../Utils/fitImageSize'

const {width, height} = Dimensions.get('window')

export default class PinganjinList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { alert(this.props.productName) } } style={styles.infoTop}>
                    <View style={styles.infoTopLeft}>
                        <Image source={this.props.imgURL} style={{ height: fitHeight(160) }} resizeMode='stretch' />
                    </View>
                    <View style={styles.infoTopRight}>
                        <ScalableText style={styles.infoProductName}>{this.props.productName}</ScalableText>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingVertical: 2.5 }}>
                            <ScalableText style={styles.fuhao}>¥</ScalableText>
                            <ScalableText style={styles.infoPrice}>{this.props.totalPrice}</ScalableText>
                        </View>
                        <ScalableText style={styles.infoWeight}>克重：{this.props.weight}g</ScalableText>
                        <ScalableText style={styles.infoWeight}>当前金价{this.props.unitPrice}元/克</ScalableText>
                    </View>
                </TouchableOpacity>
                <View style={styles.infoBottom}>
                    <View style={styles.infoBottomLeft}>
                        {this._renderTips(this.props.tips)}
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { alert('立即购买') } } style={styles.infoBottomRight}>
                        <Image source={require('../Image/goumaianniu@2x.png')} style={{ width: fitWidth(236), height: fitHeight(68) }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <ScalableText style={styles.buy}>立即购买</ScalableText>
                            </View>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _renderTips(tips) {
        let tips_arr = []
        tips.forEach((tip, index) => {
            tips_arr.push(<ScalableText key={index} style={styles.tipsText}>◆{tip}</ScalableText>)
        })
        return tips_arr
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoTop: {
        flexDirection: 'row',
        height: fitHeight(220)
    },
    infoTopLeft: {
        paddingVertical: fitHeight(30),
        paddingHorizontal: fitWidth(50)
    },
    infoTopRight: {
        // height:fitHeight(220),
        justifyContent: 'center'
    },
    infoProductName: {
        fontSize: 14,
        color: 'rgb(51,51,51)'
    },
    fuhao: {
        fontSize: 14,
        color: 'rgb(208,165,46)',
        marginRight: fitWidth(5),
        marginBottom: fitHeight(5)
    },
    infoPrice: {
        fontSize: 21,
        color: 'rgb(208,165,46)'
    },
    infoWeight: {
        fontSize: 12,
        color: 'rgb(150,150,150)',
    },
    infoBottom: {
        flexDirection: 'row',
        height: fitHeight(110),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: fitWidth(24),
        paddingRight: fitWidth(30),
        backgroundColor: 'rgb(244,240,227)'
    },
    infoBottomLeft: {
        justifyContent: 'space-between'
    },
    tipsText: {
        fontSize: 12,
        color: 'rgb(208,165,46)',
        paddingVertical: fitHeight(6)
    },
    buy: {
        fontSize: 16,
        color: 'rgb(255,255,255)',
        backgroundColor: 'rgba(0,0,0,0)'
    },
});