import React from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  Dimensions,
} from "react-native";
import { Avatar, Icon } from "react-native-paper";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import Title from "../Title/Title";
import { useTheme } from "../../helper/themeProvider";

const PetTips = () => {
  const { width, height } = Dimensions.get("screen");
    const { isDarkMode } = useTheme();
  
  return (
    <>
      <Title title="Pet Tips" />
      <View style={{flexDirection:'row',alignItems:'center', marginTop: 20, paddingHorizontal: 20}}>
            <View style={{flex:1}}>
                <ImageBackground source={require('../../../assets/images/t5.png')}
                    resizeMode='stretch'
                    style={{height:height/5.8}}>
                    <View style={{alignItems:'flex-end',marginRight:10,marginTop:10}}>
                        <Avatar.Icon icon={'heart-outline'} color={Colors.active} size={30} style={{backgroundColor:'#FFFFFF70',}}></Avatar.Icon>
                    </View>
                </ImageBackground>
                <Text style={[style.b14,{color: isDarkMode ? Colors.secondary : Colors.active}]}>Mystery of cat’s food…</Text>
                <Text style={[style.r14,{color:isDarkMode ? Colors.secondary :  Colors.disable}]}>Lorem ipsum dolor sit amet consectets…</Text>
            </View>

            <View style={{margin:8}}></View>

            <View style={{flex:1}}>
                <ImageBackground source={require('../../../assets/images/t6.png')}
                    resizeMode='stretch'
                    style={{height:height/5.8}}>
                    <View style={{alignItems:'flex-end',marginRight:10,marginTop:10}}>
                        <Avatar.Icon icon={'heart-outline'} color={Colors.active} size={30} style={{backgroundColor:'#FFFFFF70',}}></Avatar.Icon>
                    </View>
                </ImageBackground>
                <Text style={[style.b14,{color:isDarkMode ? Colors.secondary :  Colors.active}]}>Tranning dogs at home</Text>
                <Text style={[style.r14,{color: isDarkMode ? Colors.secondary :  Colors.disable}]}>Lorem ipsum dolor sit amet consectets…</Text>
            </View>
        </View>
        <View style={{flexDirection:'row', marginTop:16, paddingHorizontal: 20}}>
            <View style={{flex:1}}>
                <ImageBackground source={require('../../../assets/images/t7.png')}
                    resizeMode='stretch'
                    style={{height:height/5.8}}>
                    <View style={{alignItems:'flex-end',marginRight:10,marginTop:10}}>
                        <Avatar.Icon icon={'heart-outline'} color={Colors.active} size={30} style={{backgroundColor:'#FFFFFF70',}}></Avatar.Icon>
                    </View>
                </ImageBackground>
                <Text style={[style.b14,{color: isDarkMode ? Colors.secondary : Colors.active}]}>Vaccination for cats…</Text>
                <Text style={[style.r14,{color: isDarkMode ? Colors.secondary : Colors.disable}]}>Lorem ipsum dolor sit amet consectets…</Text>
            </View>

            <View style={{margin:8}}></View>

            <View style={{flex:1}}>
                <ImageBackground source={require('../../../assets/images/t8.png')}
                    resizeMode='stretch'
                    style={{height:height/5.8}}>
                    <View style={{alignItems:'flex-end',marginRight:10,marginTop:10}}>
                        <Avatar.Icon icon={'heart-outline'} color={Colors.active} size={30} style={{backgroundColor:'#FFFFFF70',}}></Avatar.Icon>
                    </View>
                </ImageBackground>
                <Text style={[style.b14,{color: isDarkMode ? Colors.secondary :  Colors.active}]}>Small pet sleep</Text>
                <Text style={[style.r14,{color:  isDarkMode ? Colors.secondary : Colors.disable}]}>Lorem ipsum dolor sit amet consectets…</Text>
            </View>
        </View>
    </>
  );
};

export default PetTips;
