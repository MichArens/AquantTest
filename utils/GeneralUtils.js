import { Dimensions } from "react-native";

export const w = (percent) => {
    const { width } = Dimensions.get('window');
    return (width * percent) / 100;
};
export const h = (percent) => {
    const { height } = Dimensions.get('window');
    return (height * percent) / 100;
};