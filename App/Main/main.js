/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    PixelRatio,
    Animated,
    Easing,
    Dimensions,
    ScrollView,
    Platform,
    StatusBar
} from 'react-native';
import RNShakeEvent from 'react-native-shake-event';
import ScalableText from 'react-native-text';
import TimerEnhance from 'react-native-smart-timer-enhance'

import TopBar from '../Common/topBar'
import PersonalInfo from '../Common/personalInfo'
import RecordCell from '../Common/recordCell'
import ImageCell from '../Common/imageCell'
import Detail from './detail'
import { fitWidth, fitHeight } from '../Utils/fitImageSize'

const {width, height} = Dimensions.get('window')
let rotateCatTimer = null
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            catImage: 'fangdamao',
            isRotate: 0,//0代表开始，1代表停止
            isAnimateFirst: true,//是否第一次执行
            isAnimateOver: false,//true代表上一次动画执行完
            disabledCat: false,
            rotationAngle: { min: '-15deg', max: '15deg' },//猫摇晃角度
            rotationTime: 2000,//猫摇晃周期（ms）
            opacityMore: 0,
            opacityRecord: 1,
            opacity: new Animated.Value(0),
            rotation: new Animated.Value(0),
            rotateBean: new Animated.Value(0),
            moveBeanX: new Animated.Value(0),
            moveBeanY: new Animated.Value(0),
            toggle: '更多金豆',
            beans: [
                { x: this._randomNumberInRange(-100, 0), y: this._randomNumberInRange(-30, -70) },
                { x: this._randomNumberInRange(-100, 0), y: this._randomNumberInRange(-30, -70) },
                { x: this._randomNumberInRange(-100, 0), y: this._randomNumberInRange(-30, -70) },
                { x: this._randomNumberInRange(-100, 0), y: this._randomNumberInRange(-30, -70) },
                { x: this._randomNumberInRange(0, 100), y: this._randomNumberInRange(-30, -70) },
                { x: this._randomNumberInRange(0, 100), y: this._randomNumberInRange(-30, -70) },
                { x: this._randomNumberInRange(0, 100), y: this._randomNumberInRange(-30, -70) },
                { x: this._randomNumberInRange(0, 100), y: this._randomNumberInRange(-30, -70) },
            ]
        }
    }
    componentDidMount() {
        this.startAnimation(2000)
        rotateCatTimer = this.setInterval(() => this.startAnimation(2000), 4000)
    }
    componentWillMount() {
        RNShakeEvent.addEventListener('shake', () => {//摇一摇触发的事件
            this.startMoveAnimation()
        });
    }

    componentWillUnmount() {
        RNShakeEvent.removeEventListener('shake')
    }
    startAnimation(time) {

        Animated.sequence([
            Animated.timing(this.state.rotation, {
                toValue: 1,
                duration: time,
                easing: Easing.linear
            }),
            Animated.timing(this.state.rotation, {
                toValue: 0,
                duration: time,
                easing: Easing.linear
            }),
        ]).start()
    }
    startMoveAnimation() {
        if (this.state.isAnimateFirst) {
            this.moveAnimation()
        } else {
            if (this.state.isAnimateOver) {//上一次动画执行完才调用下一次动画
                this.moveAnimation()
            }
        }
    }
    moveAnimation() {
        this.setState({ isAnimateFirst: false, isAnimateOver: false, disabledCat: true }) //避免重复摇一摇,避免点击猫变脸

        clearInterval(rotateCatTimer) //先清除定时器
        this.state.rotation.stopAnimation() //对动画变量调用stopAnimation函数
        this.setState({ rotationAngle: { min: '-30deg', max: '30deg' } }) //改变摇晃角度
        this.startAnimation(200)//改变摇晃速度
        rotateCatTimer = this.setInterval(() => this.startAnimation(200), 400)//重置定时器
        this.setTimeout(() => {//2s后撒豆子
            clearInterval(rotateCatTimer) //先清除定时器
            this.state.rotation.stopAnimation() //对动画变量调用stopAnimation函数
            this.state.rotation.setValue(0.5) //将猫放到中间                

            Animated.sequence([//顺序执行动画
                Animated.timing(this.state.opacity, {//显示豆子
                    toValue: 1,
                    duration: 100,
                    easing: Easing.linear
                }),
                Animated.parallel([//同时执行动画--上行抛物线
                    Animated.timing(this.state.moveBeanX, {
                        toValue: 1,
                        duration: 300,
                        easing: Easing.linear
                    }),
                    Animated.timing(this.state.moveBeanY, {
                        toValue: 1,
                        duration: 300,
                        easing: Easing.easeIn
                    }),
                    Animated.timing(this.state.rotateBean, {
                        toValue: 1,
                        duration: 300,
                        easing: Easing.linear
                    })
                ]),
                Animated.parallel([//同时执行动画--下行抛物线
                    Animated.timing(this.state.moveBeanX, {
                        toValue: 2,
                        duration: 300,
                        easing: Easing.linear
                    }),
                    Animated.timing(this.state.moveBeanY, {
                        toValue: 2,
                        duration: 300,
                        easing: Easing.easeIn
                    }),
                    Animated.timing(this.state.rotateBean, {
                        toValue: 2,
                        duration: 300,
                        easing: Easing.linear
                    })
                ]),
                Animated.timing(this.state.opacity, {//隐藏豆子
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear
                }),
            ]).start(() => {//重置回原点
                this.state.moveBeanX.setValue(0)
                this.state.moveBeanY.setValue(0)
                this.setState({
                    beans: [
                        { x: this._randomNumberInRange(-100, 0), y: this._randomNumberInRange(-30, -70) },
                        { x: this._randomNumberInRange(-100, 0), y: this._randomNumberInRange(-30, -70) },
                        { x: this._randomNumberInRange(-100, 0), y: this._randomNumberInRange(-30, -70) },
                        { x: this._randomNumberInRange(-100, 0), y: this._randomNumberInRange(-30, -70) },
                        { x: this._randomNumberInRange(0, 100), y: this._randomNumberInRange(-30, -70) },
                        { x: this._randomNumberInRange(0, 100), y: this._randomNumberInRange(-30, -70) },
                        { x: this._randomNumberInRange(0, 100), y: this._randomNumberInRange(-30, -70) },
                        { x: this._randomNumberInRange(0, 100), y: this._randomNumberInRange(-30, -70) },
                    ],
                    rotationAngle: { min: '-15deg', max: '15deg' }, //改变摇晃角度
                    isAnimateOver: true,
                    disabledCat: false, //恢复点击猫变脸
                })
                this.startAnimation(2000) //改变摇晃速度
                rotateCatTimer = this.setInterval(() => this.startAnimation(2000), 4000) //重置定时器
            })
        }, 2000)
    }
    render() {
        return (
            <View style={styles.container} >
                {/*顶部区域*/}
                <TopBar navigator={this.props.navigator} right={{ type: '图片' }} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/*中部区域*/}
                    <View style={styles.middle}>
                        <Image source={require('../Image/dise@2x.png')} style={{ width: width, height: fitHeight(741) }} resizeMode='stretch'>
                            <PersonalInfo navigator={this.props.navigator} />
                            <Image source={require('../Image/qiandao@2x.png')} style={styles.qiandao}>
                                <ScalableText style={{ fontSize: 12, color: 'rgb(132,99,10)' }}>摇一摇签到</ScalableText>
                            </Image>
                            <TouchableOpacity disabled={this.state.disabledCat} activeOpacity={0.8} style={styles.cat} onPressOut={() => this._toggleCatImage()}>
                                <Animated.Image
                                    resizeMode='stretch'
                                    source={this._showCatImage()}
                                    style={[{
                                        transform: [
                                            { translateY: fitHeight(334) / 2 },//通过translateY将轴点变为底部中间
                                            {
                                                rotateZ: this.state.rotation.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [this.state.rotationAngle.min, this.state.rotationAngle.max]
                                                })
                                            },
                                            { translateY: -fitHeight(334) / 2 }]//通过translateY将轴点变为底部中间
                                    }, { zIndex: 2, width: fitWidth(291), height: fitHeight(334) }]}>
                                </Animated.Image>
                                <Image source={require('../Image/touyingzheng@2x.png')} style={styles.shaddow} resizeMode='stretch' />
                            </TouchableOpacity>

                            {/*渲染撒豆子*/}
                            {
                                this.state.beans.map((item, i) => this._renderBean(item, i))
                            }


                            <View style={styles.kuang}>
                                <View style={{ paddingVertical: fitHeight(5), alignItems: 'center', marginBottom: fitHeight(30), width: fitWidth(328), borderTopWidth: 1 / PixelRatio.get(), borderBottomWidth: 1 / PixelRatio.get(), borderColor: 'rgb(208,165,46)' }}>
                                    <ScalableText style={{ fontSize: 10, color: 'rgb(208,165,46)' }}>今天再走2000步，可领取金豆</ScalableText>
                                </View>
                                <TouchableOpacity onPress={() => alert('领取金豆')}>
                                    <Image source={require('../Image/lingqujindou@2x.png')} style={{ width: fitWidth(262), height: fitHeight(53), justifyContent: 'center', alignItems: 'center' }}>
                                        <ScalableText style={styles.moreText}>领取金豆</ScalableText>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </Image>

                    </View>
                    {/*底部区域*/}
                    {this._renderMoreRecord()}
                </ScrollView>
            </View >
        );
    }
    _renderBean(item, i) {
        return (
            <Animated.Image
                key={i}
                source={require('../Image/dou@2x.png')}
                style={[{
                    opacity: this.state.opacity,
                    transform: [
                        {
                            translateX: this.state.moveBeanX.interpolate({
                                inputRange: [0, 1, 2],  //动画value输入范围
                                outputRange: [0, fitWidth(item.x), fitWidth(2 * item.x)]  //对应的输出范围
                            })
                        },
                        {
                            translateY: this.state.moveBeanY.interpolate({
                                inputRange: [0, 1, 2],  //动画value输入范围
                                outputRange: [0, fitHeight(item.y), fitHeight(140)]  //对应的输出范围
                            })
                        },
                        {
                            rotateZ: this.state.rotateBean.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: ['0deg', '180deg', '360deg']
                            })
                        }
                    ]
                }, styles.moveBean]}>
            </Animated.Image>
        )
    }
    _randomNumberInRange(lowerLimit, upperLimit) {
        return Math.floor(Math.random() * (1 + upperLimit - lowerLimit)) + lowerLimit;
    }
    _renderMoreRecord() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ justifyContent: 'center', alignItems: 'center', width: fitWidth(630), height: fitHeight(140), marginVertical: fitHeight(20) }} source={require('../Image/tuijian@2x.png')} resizeMode='stretch'>
                    <ScalableText style={styles.jptj}>精品推荐</ScalableText>
                    {/*<ScalableText style={styles.gdjd}>更多金豆</ScalableText>*/}
                    <View style={styles.fgx}></View>
                    <ScalableText style={styles.jrjj}>今日金价：266.4元/克</ScalableText>
                </Image>
                <ImageCell
                    navigator={this.props.navigator}
                    topicImage={require('../Image/lijiumijin@2x.png')}
                    topicBigImage={require('../Image/lijiumijindatu@2x.png')}
                    topTitle='历久弥金'
                    subTitle='盛世通宝，日久如新'
                    getBeanNum={30000} />
                <ImageCell
                    addstyle={{ marginVertical: fitHeight(20) }}
                    navigator={this.props.navigator}
                    topicImage={require('../Image/longfengchengxiang@2x.png')}
                    topicBigImage={require('../Image/longfengchengxiangdatu@2x.png')}
                    topTitle='龙凤呈祥'
                    subTitle='吉祥纳福，化羽而祥'
                    getBeanNum={30000} />
                <ImageCell
                    navigator={this.props.navigator}
                    topicImage={require('../Image/zhenaiyisheng@2x.png')}
                    topicBigImage={require('../Image/zhenaiyishengdatu@2x.png')}
                    topTitle='珍爱一生'
                    subTitle='挚爱守候，相生相依'
                    getBeanNum={30000} />
            </View>
        )
    }
    _toggleMoreRecord(toggle) {//金豆记录和主题切换显示
        return toggle == '更多金豆' ? this.setState({ toggle: '金豆记录', opacityMore: 1 }) : this.setState({ toggle: '更多金豆', opacityRecord: 1 })
    }
    _goNextPage(component, topTitle, topicImage) {
        const { navigator } = this.props
        if (navigator) {
            navigator.push({
                name: '详情页',
                component: component,
                params: {
                    topTitle: topTitle,
                    topicImage: topicImage
                }
            })
        }
    }
    _toggleCatImage() {//点击猫切换
        clearInterval(rotateCatTimer) //先清除定时器
        this.state.rotation.stopAnimation() //对动画变量调用stopAnimation函数
        this.state.rotation.setValue(0.5) //将猫放到中间位置
        this.setState({ catImage: 'dianjimao', disabledCat: true })//点击后立即显示点击猫,并禁用按钮避免重复点击
        setTimeout(() => {
            this.setState({ catImage: 'fangdamao', disabledCat: false })
            this.startAnimation(2000)
            rotateCatTimer = this.setInterval(() => this.startAnimation(2000), 4000) //重置定时器
        }, 1000)//2S后变回放大猫
    }
    _showCatImage() {
        return this.state.catImage === 'fangdamao' ? require('../Image/fangdamao@2x.png') : require('../Image/dianjimao@2x.png')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
        backgroundColor: 'pink',
        marginTop: Platform.OS === 'ios' ? fitHeight(40) : fitHeight(0),
    },
    middle: {
        flex: 1,
    },
    bottom: {
        flex: 1,
    },
    qiandao: {
        width: fitWidth(366),
        height: fitHeight(36),
        top: fitHeight(0),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    cat: {
        flex: 3,
        width: width * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    shaddow: {
        top: fitHeight(-30),
        zIndex: 1,
        width: fitWidth(255),
        height: fitHeight(59)
    },
    moveBean: {
        position: 'absolute',
        left: width / 2,
        top: fitHeight(741 / 2),
        zIndex: 333,
        width: fitWidth(21),
        height: fitHeight(23)
    },
    kuang: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: fitHeight(56)
    },
    kuangText: {
        fontSize: 10,
        color: 'rgb(208,165,46)',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    moreText: {
        fontSize: 12,
        color: 'rgb(132,99,10)',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    jptj: {
        fontSize: 24,
        color: 'rgb(132,99,10)',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    gdjd: {
        position: 'absolute',
        top: fitHeight(50),
        left: width / 2 + fitWidth(40),
        fontSize: 12,
        color: 'rgb(132,99,10)',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    jrjj: {
        fontSize: 12,
        color: 'rgb(132,99,10)',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    fgx: {
        width: fitWidth(290),
        height: 1 / PixelRatio.get(),
        marginVertical: 3,
        backgroundColor: 'rgb(132,99,10)'
    },

});

export default TimerEnhance(Main) //第三方组建 用于使用 this.定时函数 不用手动在组件卸载时清除定时器