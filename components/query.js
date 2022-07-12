import { API_KEY, API_URL } from '../credentials/api_cred';

function clearQuery(setTokenArray, setPageToken) {
  setTokenArray(new Set());
  setPageToken('');
}

async function fetchTemplate(url, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery) {
  if (url == '')
    return;
  var searchlist_url = url;
  console.log(searchlist_url);
  if (pageToken) {
    if (tokenArray.has(pageToken))
      return;
    searchlist_url += '&pageToken=' + pageToken;
    setTokenArray(tokenArray.add(pageToken));
  }
  var searchjson = await fetch(searchlist_url).then(response => response.json());
  setPageToken(searchjson['nextPageToken']);
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
  var searchlist_url = API_URL
    + 'search?part=snippet&type=video&maxResults=25'
    + '&q=' + query
    + '&key=' + API_KEY;
  await fetchTemplate(searchlist_url, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery);
}

async function fetchRelated(videoId, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery=false) {
  var searchlist_url = API_URL
    + 'search?part=snippet&type=video&maxResults=25'
    + '&relatedToVideoId=' + videoId
    + '&key=' + API_KEY;
  await fetchTemplate(searchlist_url, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery);
}

export { clearQuery, fetchQuery, fetchRelated };