import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')

export function fitWidth(w) {
    return w * (width / 750)
}
export function fitHeight(h) {
    return h * (height / 1334)
}

