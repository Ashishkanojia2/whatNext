import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const hp = (size:number) => (width / guidelineBaseWidth) * size;
const wp = (size:number) => (height / guidelineBaseHeight) * size;
const fp = (size :number, factor = 0.5) => size + (hp(size) - size) * factor;

export { hp, wp, fp };