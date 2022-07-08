import { API_KEY, API_URL } from '../credentials/api_cred';

function clearQuery(setTokenArray, setPageToken) {
  setTokenArray(new Set());
  setPageToken('');
}

async function fetchQuery(query, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery=false) {
  if (query == '')
    return;
  var searchlist_url = API_URL
    + 'search?part=snippet&maxResults=25'
    + '&q=' + query
    + '&key=' + API_KEY;
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
  console.log(pageToken);
}

export { clearQuery, fetchQuery };