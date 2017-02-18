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

export default class RecordCell extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={[styles.container, this.props.addStyle]}>
                <View style={styles.leftCell}>
                    <Image source={this.props.recordIcon} style={styles.recordIcon} resizeMode='stretch'/>
                    <ScalableText style={styles.cellText}>{this.props.recordText}</ScalableText>
                </View>
                <View style={styles.rightCell}>
                    <ScalableText style={styles.cellText}>{this.props.date}</ScalableText>
                    <ScalableText style={styles.cellText}>{this.props.bean}</ScalableText>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: fitHeight(90),
        flexDirection: 'row',
        paddingRight: fitWidth(30),
    },
    leftCell: {
        width: fitWidth(290),
        flexDirection: 'row',
        alignItems: 'center',
    },
    recordIcon: {
        height:fitHeight(40),
        marginLeft:fitWidth(18),
        marginRight:fitWidth(30)
    },
    rightCell: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cellText: {
        color: 'rgb(150,150,150)',
        fontSize: 14,
    },
});