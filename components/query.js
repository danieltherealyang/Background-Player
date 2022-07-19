import { API_KEY, API_URL } from '../credentials/api_cred';
import { FETCH_HEADER } from './constant';

function clearQuery(setTokenArray, setPageToken) {
  setTokenArray(new Set());
  setPageToken('');
}

async function fetchTemplate(url, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery) {
  if (url == '')
    return;
  var searchlist_url = url;
  if (pageToken) {
    if (tokenArray.has(pageToken))
      return;
    searchlist_url += '&pageToken=' + pageToken;
    setTokenArray(tokenArray.add(pageToken));
  }
  var searchjson = await fetch(searchlist_url, {headers: FETCH_HEADER}).then(response => response.json());
  if (searchjson['nextPageToken'])
    setPageToken(searchjson['nextPageToken']);
  else
    setTokenArray(tokenArray.add(''));
  var videoIds = searchjson['items'].map((video) => video['id']['videoId']).join('%2C');
  var vidlist_url = API_URL
    + 'videos?part=snippet%2CcontentDetails%2Cstatistics'
    + '&id=' + videoIds
    + '&key=' + API_KEY;
  var json = await fetch(vidlist_url).then(response => response.json());
  setState((prevState) => {
    if (clearQuery)
      return json['items'];
    else
      return prevState.concat(json['items']);
  });
}

async function fetchQuery(query, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery=false) {
  if (!query)
    return;
  var searchlist_url = API_URL
    + 'search?part=snippet&type=video&maxResults=25'
    + '&q=' + query
    + '&key=' + API_KEY;
  await fetchTemplate(searchlist_url, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery);
}

async function fetchRelated(videoId, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery=false) {
  if (!videoId)
    return;
  var searchlist_url = API_URL
    + 'search?part=snippet&type=video&maxResults=25'
    + '&relatedToVideoId=' + videoId
    + '&key=' + API_KEY;
  await fetchTemplate(searchlist_url, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery);
}

async function fetchChannelVideos(channelId, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery=false) {
  if (!pageToken && tokenArray.size)
    return;
  if (!channelId)
    return;
  var searchlist_url = API_URL
    + 'search?part=snippet&maxResults=25&order=date'
    + '&channelId=' + channelId
    + '&key=' + API_KEY;
  await fetchTemplate(searchlist_url, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery);
}

async function fetchPlaylistVideos(playlistId, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery=false) {
  if ((!pageToken && tokenArray.size) || !playlistId)
    return;
  var searchlist_url = API_URL
    + 'playlistItems?part=snippet%2CcontentDetails&maxResults=25'
    + '&playlistId=' + playlistId
    + '&key=' + API_KEY;
  if (pageToken) {
    if (tokenArray.has(pageToken))
      return;
    searchlist_url += '&pageToken=' + pageToken;
    setTokenArray(tokenArray.add(pageToken));
  }
  var searchjson = await fetch(searchlist_url, {headers: FETCH_HEADER}).then(response => response.json());
  if (searchjson['nextPageToken'])
    setPageToken(searchjson['nextPageToken']);
  else
    setTokenArray(tokenArray.add(''));
  var videoIds = searchjson['items'].map((video) => video['contentDetails']['videoId']).join('%2C');
  var vidlist_url = API_URL
    + 'videos?part=snippet%2CcontentDetails%2Cstatistics'
    + '&id=' + videoIds
    + '&key=' + API_KEY;
  var json = await fetch(vidlist_url).then(response => response.json());
  setState((prevState) => {
    if (clearQuery)
      return json['items'];
    else
      return prevState.concat(json['items']);
  });
}

export { clearQuery, fetchQuery, fetchRelated, fetchChannelVideos, fetchPlaylistVideos };