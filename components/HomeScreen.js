import React, { useCallback, useEffect, useRef, useState } from 'react';
 import {
     FlatList,
   Image,
   RefreshControl,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   useColorScheme,
   View,
 } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FlatGrid } from 'react-native-super-grid';
import { CATAGORIES, getArticles, getQueriedArticles } from '../utils/ApiUtils';
import { DARK_BLUE, GREEN, LIGHT_GREEN, OFF_WHITE, RED, TEAL } from '../utils/Colors';
import { h, w } from '../utils/GeneralUtils';
import { getAWeekAgoDate, getDateInString} from '../utils/MomentUtils';

 
 const HomeScreen = () => {
     const [articles, setArticles] = useState([]);
     const [refreshing, setRefreshing] = useState(false);
     const [searchText, setSearchText] = useState("");
     const [chosenCategory, setChosenCategory] = useState(null);
     const flatListRef = useRef(null);
         
    useEffect(() => {
        callbackGetNewArticles(false);
    }, []);

    const callbackGetNewArticles = useCallback((newQuery) => { getNewArticles(newQuery)}
    , [articles, searchText, chosenCategory]);

    const getNewArticles = async (newQuery) => {
        if (refreshing) return;

        setRefreshing(true);
        if (newQuery) {
            setArticles([]);
        }
        const data = await getArticles(searchText, chosenCategory, newQuery || !articles || !articles[articles.length - 1] ? getDateInString() : articles[articles.length - 1].publishedAt);
        console.log(data);
        if (newQuery || !articles) {
            setArticles(data.articles);
            // flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        } else {
            setArticles(articles.concat(data.articles, articles));
        }
        setRefreshing(false);
    };


   return (
    <View style={styles.mainWrapper}>
        <View style={styles.searchContainer}>
            <TextInput 
                onChangeText={(text) => setSearchText(text)}
                onEndEditing={()=> {callbackGetNewArticles(true);}}
                placeholder="Search for Article">
            </TextInput>
        </View>
        <FlatList
        contentContainerStyle={{display:'flex', alignItems: 'center', marginBottom: h(1)}}
        data={CATAGORIES}
        numColumns={3}
        renderItem={({item , index}) => {
            if (!item) return null;
            return(
                <TouchableOpacity onPress={() => {
                    setChosenCategory(item != chosenCategory ? item : null);
                    // flatListRef.current.scrollToIndex({ animated: true, index: 0 })
                    getNewArticles(true);
                    }}>
                    <Text style={{backgroundColor: chosenCategory == item ? GREEN : LIGHT_GREEN, margin: h(1), padding: h(1), borderRadius: 5}}>{item}</Text>
                </TouchableOpacity>
            );
         }}
         keyExtractor={(item, index) => String(index)}
        />
        {articles && articles.length > 0 ?
        <FlatList
        ref={flatListRef}
        data={articles}
        renderItem={({item , index}) => {
            if (!item) return null;
            return(
               <TouchableOpacity style={styles.articleWrapper} 
                    onPress={() =>{ Actions["article"]({article: item})}}>
                    <View style={styles.articleHeaderWrapper}>
                        { item.urlToImage ?
                        <Image
                            style={styles.tinyLogo}
                            source={{
                            uri: item.urlToImage ? item.urlToImage : '',
                            }}/> : null}
                        <Text style={styles.articleTitle}>{item.title}</Text>
                    </View>
                    
                    <Text style={styles.articleDate}>Posted At: {item.publishedAt}</Text>
                    <Text>{item.description}</Text>
               </TouchableOpacity>
            );
         }}
         keyExtractor={(item, index) => String(index)}
         onEndReachedThreshold={0.2}
         onEndReached={()=>callbackGetNewArticles(false)}
        >
        </FlatList>
        : !refreshing ?
        <Text style={styles.notFoundText}>No Articles Found..</Text> : null}
    </View>
   );
 };
 
 const styles = StyleSheet.create({
     mainWrapper: {
         width: '100%',
         height: '100%',
         backgroundColor: TEAL,
         padding: h(2),
        },
    searchContainer: {
        height: h(5),
        width: w(50),
        backgroundColor: OFF_WHITE,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: h(2),
      },
      tinyLogo: {
        width: 50,
        height: 50,
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
        flexDirection: 'row',
        alignItems: 'center'
    },
      articleTitle: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16
    },
      articleDate: {
        fontWeight: '400',
        fontSize: 10
    },
      notFoundText: {
        backgroundColor: OFF_WHITE,
        textAlign: 'center',
        width: 200,
        alignSelf: 'center',
        padding: h(1),
        borderRadius: 5,
      }
 });
 
 export default HomeScreen;
 