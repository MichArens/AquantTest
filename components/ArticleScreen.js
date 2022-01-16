/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
     Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
 } from 'react-native';
import { Actions } from 'react-native-router-flux';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DARK_BLUE, OFF_WHITE, TEAL } from '../utils/Colors';
import { h } from '../utils/GeneralUtils';
 
 
 const ArticleScreen = (props) => {
 
   return (
    <View style={styles.mainWrapper}>
        <TouchableOpacity style={styles.backWrapper}
            onPress={() => { Actions.pop()}}>
            <Text style={{color: TEAL}}>Back</Text>
        </TouchableOpacity>
        <ScrollView style={styles.articleWrapper}>
            <View style={styles.articleHeaderWrapper}>
                <Text style={styles.articleTitle}>{props.article.title}</Text>
                <Text style={styles.articleDate}>Posted At: {props.article.publishedAt}</Text>
                { props.article.author ? <Text style={styles.articleDate}>Author: {props.article.author}</Text> : null }
                { props.article.urlToImage ?
                <Image
                    style={styles.tinyLogo}
                    source={{
                    uri: props.article.urlToImage ? props.article.urlToImage : '',
                    }}/> : null}
                    <Text style={styles.articleDescription}>{props.article.description}</Text>
            </View>
            <Text style={styles.articleContent}>{props.article.content}</Text>
        </ScrollView>
    </View>
   );
 };
 
 const styles = StyleSheet.create({
    mainWrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: TEAL,
        padding: h(2),
        display: 'flex',
    },
    articleWrapper: {
        display: 'flex',
        marginVertical: 5,
        backgroundColor: OFF_WHITE,
        borderRadius: 10,
        padding: h(1),
        flex: 1,
      },
    tinyLogo: {
        minWidth: 100,
        minHeight: 100,
        marginRight: h(1),
      },
      articleWrapper: {
          display: 'flex',
          marginVertical: 5,
          backgroundColor: OFF_WHITE,
          borderRadius: 10,
          padding: h(1)
        },
      articleHeaderWrapper: {
        display: 'flex',
        alignItems: 'flex-start'
    },
      articleTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
      articleDate: {
        fontWeight: '400',
        fontSize: 10
    },
    articleDescription: {
        fontSize: 16,
    },
    articleContent: {
        marginTop: h(1),
        fontSize: 14
    },
    backWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: h(1),
        marginBottom: h(1),
        backgroundColor: OFF_WHITE,
        width: 80,
        height: 40,
        borderRadius: 10
    }
 });
 
 export default ArticleScreen;
 