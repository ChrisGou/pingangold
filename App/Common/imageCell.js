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

import Detail from '../Main/detail'
import { fitWidth, fitHeight } from '../Utils/fitImageSize'

const {width, height} = Dimensions.get('window')

export default class ImageCell extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => this._goNextPage(Detail, this.props.topTitle, this.props.topicBigImage)}>
                <Image style={[this.props.addstyle,{ width: width, height: fitHeight(260), justifyContent: 'center', alignItems: 'center' }]} source={this.props.topicImage}>
                    <ScalableText style={{ fontSize: 26, color: 'rgb(208,165,46)' }}>{this.props.topTitle}</ScalableText>
                    <ScalableText style={{ fontSize: 16, color: 'rgb(255,255,255)' }}>{this.props.subTitle}</ScalableText>
                    <ScalableText style={{ fontSize: 12, color: 'rgb(208,165,46)', position: 'absolute', bottom: fitHeight(14), right: fitHeight(30) }}>最多可赠{this.props.getBeanNum}金豆</ScalableText>
                </Image>
            </TouchableOpacity>
        );
    }
    _goNextPage(component, topTitle, topicBigImage) {
        const { navigator } = this.props
        if (navigator) {
            navigator.push({
                name: topTitle+'详情页',
                component: component,
                params: {
                    topTitle: topTitle,
                    topicImage: topicBigImage
                }
            })
        }
    }
}