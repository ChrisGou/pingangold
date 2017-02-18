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
import PinganjinList from '../Common/pinganjinList'
import { fitWidth, fitHeight } from '../Utils/fitImageSize'

let ljmi_arr = require('../Data/lijiumijin.json')
const {width, height} = Dimensions.get('window')

export default class Detail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                {/*顶部区域*/}
                <TopBar navigator={this.props.navigator} topTitle={this.props.topTitle} right={{ type: '图片' }} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/*主题图*/}
                    <Image source={this.props.topicImage} style={{ width: width, height: fitHeight(400) }} />
                    {/*中部区域*/}
                    <View style={styles.middle}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: fitHeight(38) }}>
                            <ScalableText style={{ fontSize: 16, color: 'rgb(51,51,51)' }}>盛世通宝，日久如新</ScalableText>
                        </View>
                        <View style={{ paddingLeft: fitWidth(30), paddingBottom: fitHeight(30) }}>
                            <ScalableText style={styles.topicInfo}>生肖金，收藏好意头</ScalableText>
                            <ScalableText style={[styles.topicInfo, { marginVertical: Platform.OS === 'ios' ? fitHeight(5) : 0, }]}>生肖金是中华传统灿烂文化的优秀题材，有着可持续收藏性。</ScalableText>
                            <ScalableText style={styles.topicInfo}>生肖金不仅设计精美且寓意十足，可以作为传家宝世代珍藏。</ScalableText>
                        </View>
                    </View>
                    {/*底部区域*/}
                    <View style={styles.bottom}>
                        <View style={styles.contentTop}></View>
                        <View style={styles.contentMiddle}>
                            <View style={styles.contentMiddleLeft}></View>
                            <View style={styles.contentMiddleMiddle}>
                                {/*拿到列表数据并渲染*/}
                                {this._renderProductList()}
                            </View>
                            <View style={styles.contentMiddleRight}></View>
                        </View>
                        <View style={styles.contentBottom}>
                            <ScalableText style={styles.topicInfo}>已经到底啦</ScalableText>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
    _renderProductList() {
        let product_arr = []
        ljmi_arr.forEach((info, index) => {
            product_arr.push(
                <PinganjinList
                    key={index}
                    imgURL={require('../Image/jintiao@2x.png')}
                    productName={info.productName}
                    totalPrice={info.totalPrice}
                    weight={info.weight}
                    unitPrice={info.unitPrice}
                    tips={info.tips}
                    />
            )
        })
        return product_arr
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        height: 64
    },
    topBarContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 30 : 20
    },
    topTitle: {
        fontSize: 19,
        color: 'rgb(208,165,46)'
    },
    middle: {
        flex: 1,
    },
    bottom: {
        flex: 1,
    },
    topicInfo: {
        fontSize: 12,
        color: 'rgb(150,150,150)',
    },
    contentTop: {
        height: fitHeight(40),
        backgroundColor: 'rgb(248,248,248)',
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: 'rgb(202,165,71)'
    },
    contentBottom: {
        height: fitHeight(100),
        backgroundColor: 'rgb(248,248,248)',
        borderTopWidth: 1 / PixelRatio.get(),
        borderColor: 'rgb(202,165,71)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentMiddle: {
        flex: 1,
        flexDirection: 'row',
    },
    contentMiddleLeft: {
        width: fitWidth(30),
        borderRightWidth: 1 / PixelRatio.get(),  
        borderColor: 'rgb(202,165,71)',      
        backgroundColor: 'rgb(248,248,248)'
    },
    contentMiddleRight: {
        width: fitWidth(30),
        borderLeftWidth: 1 / PixelRatio.get(),
        borderColor: 'rgb(202,165,71)',
        backgroundColor: 'rgb(248,248,248)'
    },
    contentMiddleMiddle: {
        flex: 1,
    },
});