import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Audio } from "expo-av";

/**
 * 
 * @param {JSON} item , json format of the sounds information (uri, name, id)
 * @returns view of on tile from the soundboard
 */
const SampleItem = ({item, setItem, setVisible}) => {
    const [sound, setSound] = useState();

    //play the sound
    const playSound = async () => {
        const uri = item.uri;
        const {sound} = await Audio.Sound.createAsync(require("../../assets/sound-pack/"+uri));
        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
            return () => {
                if (sound) {
                    sound.unloadAsync();
                }
            }
        }
        , [sound]);

    const onLongPress = () => {
        setVisible(true);
        setItem(item);
    };

    //element of one soundboard tile
    return (
        <View style={[styles.container, {backgroundColor: item.color}]}>
            <TouchableOpacity onPress={playSound} onLongPress={onLongPress} >
                <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );
};

//design of the tile
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 100,
    },
    title: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        textAlign: "center",
        marginBottom: 30,
    },
});

export default SampleItem;
