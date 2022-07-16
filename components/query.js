import { API_KEY, API_URL } from '../credentials/api_cred';

function clearQuery(setTokenArray, setPageToken) {
  setTokenArray(new Set());
  setPageToken('');
}

async function fetchTemplate(url, setState, tokenArray, setTokenArray, pageToken, setPageToken, clearQuery) {
  if (url == '')
    return;
  // var searchlist_url = url;
  // console.log(searchlist_url);
  // if (pageToken) {
  //   if (tokenArray.has(pageToken))
  //     return;
  //   searchlist_url += '&pageToken=' + pageToken;
  //   setTokenArray(tokenArray.add(pageToken));
  // }
  // var searchjson = await fetch(searchlist_url).then(response => response.json());
  // setPageToken(searchjson['nextPageToken']);
  // var videoIds = searchjson['items'].map((video) => video['id']['videoId']).join('%2C');
  // var vidlist_url = API_URL
  //   + 'videos?part=snippet%2CcontentDetails%2Cstatistics'
  //   + '&id=' + videoIds
  //   + '&key=' + API_KEY;
  // var json = await fetch(vidlist_url).then(response => response.json());
  // setState((prevState) => {
  //   if (clearQuery)
  //     return json['items'];
  //   else
  //     return prevState.concat(json['items']);
  // });
  setState((prevState) => {
    if (clearQuery)
      return fakeData['items'];
    else
      return prevState.concat(fakeData['items']);
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

const fakeData = {
  "kind": "youtube#videoListResponse",
  "etag": "K3HpQfH2EUW6wpKHJf0gaev4LZ8",
  "items": [
    {
      "kind": "youtube#video",
      "etag": "ulkSBDtRouPiXcyzgkRpfWBLcd0",
      "id": "Ks-_Mh1QhMc",
      "snippet": {
        "publishedAt": "2012-10-01T15:27:35Z",
        "channelId": "UCAuUUnT6oDeKwE6v1NGQxug",
        "title": "Your body language may shape who you are | Amy Cuddy",
        "description": "Body language affects how others see us, but it may also change how we see ourselves. Social psychologist Amy Cuddy argues that \"power posing\" -- standing in a posture of confidence, even when we don't feel confident -- can boost feelings of confidence, and might have an impact on our chances for success. (Note: Some of the findings presented in this talk have been referenced in an ongoing debate among social scientists about robustness and reproducibility. Read Amy Cuddy's response here: http://ideas.ted.com/inside-the-debate-about-power-posing-a-q-a-with-amy-cuddy/)\n\nGet TED Talks recommended just for you! Learn more at https://www.ted.com/signup.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more.\n\nFollow TED on Twitter: http://www.twitter.com/TEDTalks\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: https://www.youtube.com/TED",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
            "width": 480,
            "height": 360
          },
          "standard": {
            "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/sddefault.jpg",
            "width": 640,
            "height": 480
          },
          "maxres": {
            "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/maxresdefault.jpg",
            "width": 1280,
            "height": 720
          }
        },
        "channelTitle": "TED",
        "tags": [
          "Amy Cuddy",
          "TED",
          "TEDTalk",
          "TEDTalks",
          "TED Talk",
          "TED Talks",
          "TEDGlobal",
          "brain",
          "business",
          "psychology",
          "self",
          "success"
        ],
        "categoryId": "22",
        "liveBroadcastContent": "none",
        "defaultLanguage": "en",
        "localized": {
          "title": "Your body language may shape who you are | Amy Cuddy",
          "description": "Body language affects how others see us, but it may also change how we see ourselves. Social psychologist Amy Cuddy argues that \"power posing\" -- standing in a posture of confidence, even when we don't feel confident -- can boost feelings of confidence, and might have an impact on our chances for success. (Note: Some of the findings presented in this talk have been referenced in an ongoing debate among social scientists about robustness and reproducibility. Read Amy Cuddy's response here: http://ideas.ted.com/inside-the-debate-about-power-posing-a-q-a-with-amy-cuddy/)\n\nGet TED Talks recommended just for you! Learn more at https://www.ted.com/signup.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more.\n\nFollow TED on Twitter: http://www.twitter.com/TEDTalks\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: https://www.youtube.com/TED"
        },
        "defaultAudioLanguage": "en"
      },
      "contentDetails": {
        "duration": "PT21M3S",
        "dimension": "2d",
        "definition": "hd",
        "caption": "true",
        "licensedContent": true,
        "contentRating": {},
        "projection": "rectangular"
      },
      "statistics": {
        "viewCount": "21341538",
        "likeCount": "338784",
        "favoriteCount": "0",
        "commentCount": "9101"
      }
    },
    {
      "kind": "youtube#video",
      "etag": "3JOglNUqyTQ67TcVQF-aQmhHtcM",
      "id": "c0KYU2j0TM4",
      "snippet": {
        "publishedAt": "2012-03-02T19:03:16Z",
        "channelId": "UCAuUUnT6oDeKwE6v1NGQxug",
        "title": "The power of introverts | Susan Cain",
        "description": "Visit http://TED.com to get our entire library of TED Talks, transcripts, translations, personalized talk recommendations and more.\n\nIn a culture where being social and outgoing are prized above all else, it can be difficult, even shameful, to be an introvert. But, as Susan Cain argues in this passionate talk, introverts bring extraordinary talents and abilities to the world, and should be encouraged and celebrated.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more. You're welcome to link to or embed these videos, forward them to others and share these ideas with people you know. \n\nFollow TED on Twitter: http://twitter.com/TEDTalks\nLike TED on Facebook: http://facebook.com/TED\nSubscribe to our channel: http://youtube.com/TED\n\nTED's videos may be used for non-commercial purposes under a Creative Commons License, Attribution–Non Commercial–No Derivatives (or the CC BY – NC – ND 4.0 International) and in accordance with our TED Talks Usage Policy (https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy). For more information on using TED for commercial purposes (e.g. employee learning, in a film or online course), please submit a Media Request at https://media-requests.ted.com",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/c0KYU2j0TM4/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/c0KYU2j0TM4/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/c0KYU2j0TM4/hqdefault.jpg",
            "width": 480,
            "height": 360
          },
          "standard": {
            "url": "https://i.ytimg.com/vi/c0KYU2j0TM4/sddefault.jpg",
            "width": 640,
            "height": 480
          },
          "maxres": {
            "url": "https://i.ytimg.com/vi/c0KYU2j0TM4/maxresdefault.jpg",
            "width": 1280,
            "height": 720
          }
        },
        "channelTitle": "TED",
        "tags": [
          "Susan Cain",
          "culture",
          "psychology",
          "introvert",
          "Quiet",
          "Power of Introverts Book",
          "extravert",
          "TED",
          "TED2012",
          "TEDTalk",
          "TEDTalks",
          "TED Talk",
          "TED Talks"
        ],
        "categoryId": "22",
        "liveBroadcastContent": "none",
        "defaultLanguage": "en",
        "localized": {
          "title": "The power of introverts | Susan Cain",
          "description": "Visit http://TED.com to get our entire library of TED Talks, transcripts, translations, personalized talk recommendations and more.\n\nIn a culture where being social and outgoing are prized above all else, it can be difficult, even shameful, to be an introvert. But, as Susan Cain argues in this passionate talk, introverts bring extraordinary talents and abilities to the world, and should be encouraged and celebrated.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more. You're welcome to link to or embed these videos, forward them to others and share these ideas with people you know. \n\nFollow TED on Twitter: http://twitter.com/TEDTalks\nLike TED on Facebook: http://facebook.com/TED\nSubscribe to our channel: http://youtube.com/TED\n\nTED's videos may be used for non-commercial purposes under a Creative Commons License, Attribution–Non Commercial–No Derivatives (or the CC BY – NC – ND 4.0 International) and in accordance with our TED Talks Usage Policy (https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy). For more information on using TED for commercial purposes (e.g. employee learning, in a film or online course), please submit a Media Request at https://media-requests.ted.com"
        }
      },
      "contentDetails": {
        "duration": "PT19M5S",
        "dimension": "2d",
        "definition": "hd",
        "caption": "true",
        "licensedContent": true,
        "contentRating": {},
        "projection": "rectangular"
      },
      "statistics": {
        "viewCount": "13889251",
        "likeCount": "355813",
        "favoriteCount": "0",
        "commentCount": "18275"
      }
    },
    {
      "kind": "youtube#video",
      "etag": "wKVLgUc7yKXLotHscssyLuVTtqI",
      "id": "eIho2S0ZahI",
      "snippet": {
        "publishedAt": "2014-06-27T15:10:18Z",
        "channelId": "UCAuUUnT6oDeKwE6v1NGQxug",
        "title": "How to speak so that people want to listen | Julian Treasure",
        "description": "Visit http://TED.com to get our entire library of TED Talks, transcripts, translations, personalized talk recommendations and more.\n\nHave you ever felt like you're talking, but nobody is listening? Here's Julian Treasure to help you fix that. As the sound expert demonstrates some useful vocal exercises and shares tips on how to speak with empathy, he offers his vision for a sonorous world of listening and understanding.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more. You're welcome to link to or embed these videos, forward them to others and share these ideas with people you know. \n\nFollow TED on Twitter: http://twitter.com/TEDTalks\nLike TED on Facebook: http://facebook.com/TED\nSubscribe to our channel: http://youtube.com/TED\n\nTED's videos may be used for non-commercial purposes under a Creative Commons License, Attribution–Non Commercial–No Derivatives (or the CC BY – NC – ND 4.0 International) and in accordance with our TED Talks Usage Policy (https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy). For more information on using TED for commercial purposes (e.g. employee learning, in a film or online course), please submit a Media Request at https://media-requests.ted.com",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/eIho2S0ZahI/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/eIho2S0ZahI/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/eIho2S0ZahI/hqdefault.jpg",
            "width": 480,
            "height": 360
          },
          "standard": {
            "url": "https://i.ytimg.com/vi/eIho2S0ZahI/sddefault.jpg",
            "width": 640,
            "height": 480
          },
          "maxres": {
            "url": "https://i.ytimg.com/vi/eIho2S0ZahI/maxresdefault.jpg",
            "width": 1280,
            "height": 720
          }
        },
        "channelTitle": "TED",
        "tags": [
          "TEDTalk",
          "TEDTalks",
          "TED Talk",
          "TED Talks",
          "TED",
          "Julian Treasure",
          "culture",
          "sound",
          "speech",
          "TEDGlobal"
        ],
        "categoryId": "26",
        "liveBroadcastContent": "none",
        "defaultLanguage": "en",
        "localized": {
          "title": "How to speak so that people want to listen | Julian Treasure",
          "description": "Visit http://TED.com to get our entire library of TED Talks, transcripts, translations, personalized talk recommendations and more.\n\nHave you ever felt like you're talking, but nobody is listening? Here's Julian Treasure to help you fix that. As the sound expert demonstrates some useful vocal exercises and shares tips on how to speak with empathy, he offers his vision for a sonorous world of listening and understanding.\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more. You're welcome to link to or embed these videos, forward them to others and share these ideas with people you know. \n\nFollow TED on Twitter: http://twitter.com/TEDTalks\nLike TED on Facebook: http://facebook.com/TED\nSubscribe to our channel: http://youtube.com/TED\n\nTED's videos may be used for non-commercial purposes under a Creative Commons License, Attribution–Non Commercial–No Derivatives (or the CC BY – NC – ND 4.0 International) and in accordance with our TED Talks Usage Policy (https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy). For more information on using TED for commercial purposes (e.g. employee learning, in a film or online course), please submit a Media Request at https://media-requests.ted.com"
        }
      },
      "contentDetails": {
        "duration": "PT9M59S",
        "dimension": "2d",
        "definition": "hd",
        "caption": "true",
        "licensedContent": true,
        "contentRating": {},
        "projection": "rectangular"
      },
      "statistics": {
        "viewCount": "33822897",
        "likeCount": "662509",
        "favoriteCount": "0",
        "commentCount": "9607"
      }
    },
    {
      "kind": "youtube#video",
      "etag": "dLil4VcqB6X6F14ZbjfgSntw8gE",
      "id": "2BwqLCDKFJo",
      "snippet": {
        "publishedAt": "2022-07-12T15:15:00Z",
        "channelId": "UCwV_0HmQkRrTcrReaMxPeDw",
        "title": "TYLER1: VOD REVIEWING MRBEAST VS NINJA",
        "description": "If you enjoyed, please be sure to comment \"hehe xd\" and like the video. 🌚 Thank you 💙\r\nI'm streaming EVERYDAY:  https://www.twitch.tv/loltyler1/\r\n►SUBSCRIBE to my channel for more videos: https://goo.gl/pqlICI\r\n\n\r00:00 intro\n03:05 vod review\n17:23 clean nautilus \n24:32 heimerdinger mid\n30:09 akshan mid\n35:50 outro\n\nFollow me here:\r\n► Twitch - https://www.twitch.tv/loltyler1\r\n► Instagram - https://www.instagram.com/tyler1_alpha\r\n► Twitter - https://twitter.com/loltyler1\r\n► Merch - http://www.loltyler1.com/",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/2BwqLCDKFJo/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/2BwqLCDKFJo/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/2BwqLCDKFJo/hqdefault.jpg",
            "width": 480,
            "height": 360
          },
          "standard": {
            "url": "https://i.ytimg.com/vi/2BwqLCDKFJo/sddefault.jpg",
            "width": 640,
            "height": 480
          },
          "maxres": {
            "url": "https://i.ytimg.com/vi/2BwqLCDKFJo/maxresdefault.jpg",
            "width": 1280,
            "height": 720
          }
        },
        "channelTitle": "loltyler1",
        "tags": [
          "tyler1",
          "loltyler1",
          "t1"
        ],
        "categoryId": "20",
        "liveBroadcastContent": "none",
        "defaultLanguage": "en",
        "localized": {
          "title": "TYLER1: VOD REVIEWING MRBEAST VS NINJA",
          "description": "If you enjoyed, please be sure to comment \"hehe xd\" and like the video. 🌚 Thank you 💙\r\nI'm streaming EVERYDAY:  https://www.twitch.tv/loltyler1/\r\n►SUBSCRIBE to my channel for more videos: https://goo.gl/pqlICI\r\n\n\r00:00 intro\n03:05 vod review\n17:23 clean nautilus \n24:32 heimerdinger mid\n30:09 akshan mid\n35:50 outro\n\nFollow me here:\r\n► Twitch - https://www.twitch.tv/loltyler1\r\n► Instagram - https://www.instagram.com/tyler1_alpha\r\n► Twitter - https://twitter.com/loltyler1\r\n► Merch - http://www.loltyler1.com/"
        }
      },
      "contentDetails": {
        "duration": "PT36M12S",
        "dimension": "2d",
        "definition": "hd",
        "caption": "false",
        "licensedContent": true,
        "contentRating": {},
        "projection": "rectangular"
      },
      "statistics": {
        "viewCount": "34242",
        "likeCount": "2126",
        "favoriteCount": "0",
        "commentCount": "96"
      }
    },
    {
      "kind": "youtube#video",
      "etag": "71RBbcKoUSOJd4BW4fOXI861J7E",
      "id": "E4asbGgTjwg",
      "snippet": {
        "publishedAt": "2022-06-30T08:30:01Z",
        "channelId": "UC-eegKVWEgBCa4OzjnK_PtA",
        "title": "Why Turkey Suddenly Approved Finland & Sweden Joining NATO",
        "description": "Sign up for a CuriosityStream subscription and also get a FREE Nebula subscription (the streaming platform built by creators): http://CuriosityStream.com/TLDReu\n\nDaily Briefing YouTube: https://www.youtube.com/tldrdaily\nDaily Briefing Podcast: https://art19.com/shows/the-daily-briefing\n\nOn Tuesday Turkey, Sweden & Finland signed an agreement which sees Turkey revoke their veto on their NATO membership. So in this video we run through what the 3 countries agreed to, and why President Erdogan suddenly changed his mind on the nordic nations.\n\n💬 Twitter: https://twitter.com/tldrnewseu\n📸 Instagram: http://www.instagram.com/tldrnewseu\n🎞 TikTok: https://www.tiktok.com/@tldrnews\n🗣 Discord: https://tldrnews.co.uk/discord/I\n\n💡 Got a Topic Suggestion? - https://forms.gle/mahEFmsW1yGTNEYXA\n\nSupport TLDR on Patreon: http://www.patreon.com/tldrnews\nDonate by PayPal: https://tldrnews.co.uk/funding\nTLDR Store: https://www.tldrnews.co.uk/store\nTLDR TeeSpring Store: https://teespring.com/stores/tldr-spring\nLearn About Our Funding: https://tldrnews.co.uk/funding\n\nTLDR is all about getting you up to date with the news of today, without bias and without filter. We aim to give you the information you need, quickly and simply so that you can make your own decision.\n\nTLDR is a completely independent & privately owned media company that's not afraid to tackle the issues we think are most important. The channel is run by just a small group of young people, with us hoping to pass on our enthusiasm for politics to other young people. We are primarily fan sourced with most of our funding coming from donations and ad revenue. No shady corporations, no one telling us what to say. We can't wait to grow further and help more people get informed. Help support us by subscribing, following, and backing us on Patreon. Thanks!\n\n/////////////////////////////////\n\n1 - https://twitter.com/SamRamani2/status/1540637317408382976\n2 - https://twitter.com/SamRamani2/status/1540639870997127168\n3 - https://twitter.com/KyivIndependent/status/1540754580715311105\n4 - https://twitter.com/PedderSophie/status/1537336753480146945\n5 - https://twitter.com/ProfPaulPoast/status/1540682887695110145\n6 - https://www.washingtonpost.com/outlook/2022/06/23/ukraine-war-deaths-soldiers-history/",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/E4asbGgTjwg/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/E4asbGgTjwg/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/E4asbGgTjwg/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "TLDR News EU",
        "categoryId": "22",
        "liveBroadcastContent": "none",
        "localized": {
          "title": "Why Turkey Suddenly Approved Finland & Sweden Joining NATO",
          "description": "Sign up for a CuriosityStream subscription and also get a FREE Nebula subscription (the streaming platform built by creators): http://CuriosityStream.com/TLDReu\n\nDaily Briefing YouTube: https://www.youtube.com/tldrdaily\nDaily Briefing Podcast: https://art19.com/shows/the-daily-briefing\n\nOn Tuesday Turkey, Sweden & Finland signed an agreement which sees Turkey revoke their veto on their NATO membership. So in this video we run through what the 3 countries agreed to, and why President Erdogan suddenly changed his mind on the nordic nations.\n\n💬 Twitter: https://twitter.com/tldrnewseu\n📸 Instagram: http://www.instagram.com/tldrnewseu\n🎞 TikTok: https://www.tiktok.com/@tldrnews\n🗣 Discord: https://tldrnews.co.uk/discord/I\n\n💡 Got a Topic Suggestion? - https://forms.gle/mahEFmsW1yGTNEYXA\n\nSupport TLDR on Patreon: http://www.patreon.com/tldrnews\nDonate by PayPal: https://tldrnews.co.uk/funding\nTLDR Store: https://www.tldrnews.co.uk/store\nTLDR TeeSpring Store: https://teespring.com/stores/tldr-spring\nLearn About Our Funding: https://tldrnews.co.uk/funding\n\nTLDR is all about getting you up to date with the news of today, without bias and without filter. We aim to give you the information you need, quickly and simply so that you can make your own decision.\n\nTLDR is a completely independent & privately owned media company that's not afraid to tackle the issues we think are most important. The channel is run by just a small group of young people, with us hoping to pass on our enthusiasm for politics to other young people. We are primarily fan sourced with most of our funding coming from donations and ad revenue. No shady corporations, no one telling us what to say. We can't wait to grow further and help more people get informed. Help support us by subscribing, following, and backing us on Patreon. Thanks!\n\n/////////////////////////////////\n\n1 - https://twitter.com/SamRamani2/status/1540637317408382976\n2 - https://twitter.com/SamRamani2/status/1540639870997127168\n3 - https://twitter.com/KyivIndependent/status/1540754580715311105\n4 - https://twitter.com/PedderSophie/status/1537336753480146945\n5 - https://twitter.com/ProfPaulPoast/status/1540682887695110145\n6 - https://www.washingtonpost.com/outlook/2022/06/23/ukraine-war-deaths-soldiers-history/"
        }
      },
      "contentDetails": {
        "duration": "PT9M53S",
        "dimension": "2d",
        "definition": "hd",
        "caption": "false",
        "licensedContent": true,
        "contentRating": {},
        "projection": "rectangular"
      },
      "statistics": {
        "viewCount": "365363",
        "likeCount": "13520",
        "favoriteCount": "0",
        "commentCount": "2796"
      }
    }
  ],
  "pageInfo": {
    "totalResults": 5,
    "resultsPerPage": 5
  }
};

export { clearQuery, fetchQuery, fetchRelated, fakeData };