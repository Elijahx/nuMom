import {Image, Text, View} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import miamiImage from "./palm-tree-beach.png";
import Button from "./Button";

export default function MustLiveInMiami(props) {

    return (
        <View duration={1000} style={appStyles.container}>
            <View style={{
                paddingTop: appStyles.win.height * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute'}}>
                <Text style={appStyles.titleBlack}>{props.getLocalizedText("pleaseNote")}</Text>
                <View style={{padding: '8%'}}>
                <Image style={{width: appStyles.win.width, height: 175}} source={miamiImage}/>
                </View>
                <View style={{width: appStyles.win.width * 0.8}}>
                    <Text style={{...appStyles.paragraphText, textAlign: 'center'} }>{props.getLocalizedText("someFeaturesOnlyMiami")}</Text>
                </View>
            </View>
            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: '12%'
            }}>
                <Button text={props.getLocalizedText("iUnderstandButton")} onPress={() => props.getNextScreen()}/>
            </View>
        </View>
    )

}