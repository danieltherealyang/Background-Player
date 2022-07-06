import { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import SearchBar from '../components/searchbar';
import VideoCard from '../components/videocard';

const array = [];
for (let i = 0; i < 20; i++) {
  array.push(
    <View style={{padding: 20}} key={i}>
      <Text>{i}</Text>
    </View>
  );
}

export default function SearchScreen({ route, navigation }) {
  const {backScreen} = route.params;
  var [ componentArray, setComponentArray ] = useState([]);
  console.log('Search Screen rendering');
  return (
    <SafeAreaView>
      <SearchBar setComponents={setComponentArray} backHandle={() => navigation.navigate(backScreen)}/>
      <ScrollView style={{width: '100%', height: '100%', borderColor: 'red', borderWidth: 0}}>
        <VideoCard source={"https://i.ytimg.com/vi/UkYIuh68SvE/hqdefault.jpg"}/>
        {componentArray}
      </ScrollView>
    </SafeAreaView>
  );
}

// Videos:
// {
//   "kind": "youtube#videoListResponse",
//   "etag": "DGc7g8BUT1E6wgkdEtysDiw_Rw0",
//   "items": [
//     {
//       "kind": "youtube#video",
//       "etag": "F8O-V0RmYcfqnXcEw9RmQZddzSo",
//       "id": "UkYIuh68SvE",
//       "snippet": {
//         "publishedAt": "2022-07-04T12:15:01Z",
//         "channelId": "UCFGbR-eb7DMjHXZNsvJzwoA",
//         "title": "what do you want?💦",
//         "description": "#muichirouxiv #anime\n~This is \"Non-Profit Channel\". This channel is for entertainment and to advertise the content only!\n\nSource: ⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⠀\n⠀⠀⠀⣴⠿⠏⠀⠀⠀⠀⠀⠀⢳⡀⠀   \n⠀⠀⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀⣧⠀\n⠀⠀⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲⣿⠀= \n⠀⠀⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀  ⣿⠀ \n⠀⠀⠙⢿⣯⠄⠀⠀⠀⢀⡀⠀⠀⡿⠀⠀\n⠀⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀⠀⠀\n⠀⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀⠀⣄⢸⠀⠀⠀⠀⠀⠀\n⣿⣿⣧⣀⣿………⣀⣰⣏⣘⣆⣀⠀\nBackup channel: \nhttps://youtube.com/channel/UCFzNj3FpFnkgFVXM-rbNLIw\n\nSocial Media ----------------------------------\nTwitter - https://twitter.com/muichirouxiv\nInstagram - https://www.instagram.com/muichirouxiv\n\n\nDon't Forget to ---------------------------------\n✅ Subscribe for more\n✅ Leave a Like\n\n\n\nCopyright Disclaimer ----------------------------------\nCopyright Disclaimer Under Section 107 of the Copyright Act 1976, allowance is made for \"fair use\" for purposes such as criticism, comment, news reporting, teaching, scholarship, and research. Fair use is a use permitted by copyright statute that might otherwise be infringing.",
//         "thumbnails": {
//           "default": {
//             "url": "https://i.ytimg.com/vi/UkYIuh68SvE/default.jpg",
//             "width": 120,
//             "height": 90
//           },
//           "medium": {
//             "url": "https://i.ytimg.com/vi/UkYIuh68SvE/mqdefault.jpg",
//             "width": 320,
//             "height": 180
//           },
//           "high": {
//             "url": "https://i.ytimg.com/vi/UkYIuh68SvE/hqdefault.jpg",
//             "width": 480,
//             "height": 360
//           }
//         },
//         "channelTitle": "Muichirou XIV",
//         "tags": [
//           "Anime",
//           "Anime theory",
//           "to love ru",
//           "yui kotegawa",
//           "yusa emixiii",
//           "anizone",
//           "yoshi senpai",
//           "zack senpai",
//           "daily anime",
//           "ecchi anime",
//           "anime funny",
//           "funny anime"
//         ],
//         "categoryId": "1",
//         "liveBroadcastContent": "none",
//         "localized": {
//           "title": "what do you want?💦",
//           "description": "#muichirouxiv #anime\n~This is \"Non-Profit Channel\". This channel is for entertainment and to advertise the content only!\n\nSource: ⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⠀\n⠀⠀⠀⣴⠿⠏⠀⠀⠀⠀⠀⠀⢳⡀⠀   \n⠀⠀⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀⣧⠀\n⠀⠀⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲⣿⠀= \n⠀⠀⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀  ⣿⠀ \n⠀⠀⠙⢿⣯⠄⠀⠀⠀⢀⡀⠀⠀⡿⠀⠀\n⠀⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀⠀⠀\n⠀⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀⠀⣄⢸⠀⠀⠀⠀⠀⠀\n⣿⣿⣧⣀⣿………⣀⣰⣏⣘⣆⣀⠀\nBackup channel: \nhttps://youtube.com/channel/UCFzNj3FpFnkgFVXM-rbNLIw\n\nSocial Media ----------------------------------\nTwitter - https://twitter.com/muichirouxiv\nInstagram - https://www.instagram.com/muichirouxiv\n\n\nDon't Forget to ---------------------------------\n✅ Subscribe for more\n✅ Leave a Like\n\n\n\nCopyright Disclaimer ----------------------------------\nCopyright Disclaimer Under Section 107 of the Copyright Act 1976, allowance is made for \"fair use\" for purposes such as criticism, comment, news reporting, teaching, scholarship, and research. Fair use is a use permitted by copyright statute that might otherwise be infringing."
//         }
//       },
//       "contentDetails": {
//         "duration": "PT17S",
//         "dimension": "2d",
//         "definition": "hd",
//         "caption": "false",
//         "licensedContent": false,
//         "contentRating": {},
//         "projection": "rectangular"
//       },
//       "statistics": {
//         "viewCount": "88797",
//         "likeCount": "7009",
//         "favoriteCount": "0",
//         "commentCount": "134"
//       }
//     }
//   ],
//   "pageInfo": {
//     "totalResults": 1,
//     "resultsPerPage": 1
//   }
// }



// Channel:
// {
//   "kind": "youtube#channelListResponse",
//   "etag": "fmHcAXN0rWNOB-vuaAR6kpGoBxo",
//   "pageInfo": {
//     "totalResults": 1,
//     "resultsPerPage": 5
//   },
//   "items": [
//     {
//       "kind": "youtube#channel",
//       "etag": "hwn8oISIpKK75c9LpZK1n5M3gtc",
//       "id": "UCFGbR-eb7DMjHXZNsvJzwoA",
//       "snippet": {
//         "title": "Muichirou XIV",
//         "description": "Muichirou XIV\n~This is \"Non-Profit Channel\". This channel is only for entertainment and to advertise the content!\n\nDo Subscribe\n",
//         "customUrl": "muichirouxiii",
//         "publishedAt": "2019-05-12T01:53:31Z",
//         "thumbnails": {
//           "default": {
//             "url": "https://yt3.ggpht.com/ytc/AKedOLSJP9i2nzpXZNqzLrWQQzngVPY1dm3G_zwHUcvT_w=s88-c-k-c0x00ffffff-no-rj",
//             "width": 88,
//             "height": 88
//           },
//           "medium": {
//             "url": "https://yt3.ggpht.com/ytc/AKedOLSJP9i2nzpXZNqzLrWQQzngVPY1dm3G_zwHUcvT_w=s240-c-k-c0x00ffffff-no-rj",
//             "width": 240,
//             "height": 240
//           },
//           "high": {
//             "url": "https://yt3.ggpht.com/ytc/AKedOLSJP9i2nzpXZNqzLrWQQzngVPY1dm3G_zwHUcvT_w=s800-c-k-c0x00ffffff-no-rj",
//             "width": 800,
//             "height": 800
//           }
//         },
//         "localized": {
//           "title": "Muichirou XIV",
//           "description": "Muichirou XIV\n~This is \"Non-Profit Channel\". This channel is only for entertainment and to advertise the content!\n\nDo Subscribe\n"
//         },
//         "country": "JP"
//       },
//       "contentDetails": {
//         "relatedPlaylists": {
//           "likes": "",
//           "uploads": "UUFGbR-eb7DMjHXZNsvJzwoA"
//         }
//       },
//       "statistics": {
//         "viewCount": "182057896",
//         "hiddenSubscriberCount": true,
//         "videoCount": "391"
//       }
//     }
//   ]
// }
