/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

import ScalableText from 'react-native-text';
import { fitWidth, fitHeight } from '../Utils/fitImageSize'

export default class PajButton extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity activeOpacity={0.8} style={this.props.addStyle} onPress={() => alert(this.props.btnName)}>
                <Image source={require('../Image/anniu@2x.png')} style={styles.btnImage} resizeMode='stretch'>
                    <ScalableText style={styles.btnName}>{this.props.btnName}</ScalableText>
                </Image>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    btnImage: {
        width:fitWidth(536),
        // height:fitHeight(68),
        justifyContent:'center',
        alignItems:'center'
    },
    btnName:{
        fontSize:14,
        color:'rgb(255,255,255)'
    }
});