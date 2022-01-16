import { getAWeekAgoDate, getDateInString } from "./MomentUtils";

const API_KEY = 'ea2cb3a1930b4b7aafa3cbfe0eb968bd';
const COUNTRY = 'us';
const LANGUAGE = 'en';
const PAGE_SIZE = 10;
export const CATAGORIES = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

/**
 * @param {*} query specific search text query
 * @param {*} category category chosen
 * @param {*} startDate date to start the new query
 * @returnsReturns an object with an array of articles
 * 
 * NOTE: for some reason 'from' doesn't work.
 */
export const getArticles = async (query, category, startDate) => {
    console.log('Start date:',startDate, 'end date:', getAWeekAgoDate(startDate));
    const url = "https://newsapi.org/v2/top-headlines?apiKey=" + API_KEY 
    + "&pageSize=" + PAGE_SIZE 
    // + "&pages=1&country=" + COUNTRY 
    + "&language=" + LANGUAGE 
    + (query ? "&q=" + query : "")
    + (category ? "&category=" + category.toLowerCase() : "")
    + (startDate ? ("&from=" + startDate + "&to=" + getAWeekAgoDate(startDate)) : ("&from=" + getDateInString() + "&to=" + getAWeekAgoDate(new Date())));
    try {
        const response = await fetch(url, {method: 'GET', headers: new Headers({
            'Content-Type': 'application/json',
        }), body: ''});
        const json = await response.json();
        // console.log(json);
        return json;
    } catch (error) {
        return null;
    }
};