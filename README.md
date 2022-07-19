# Youtube Background Player
The Very Good Player is a mobile app that allows you to browse and play Youtube videos with background play capabilities. UI was based on the Youtube app. Code was written in React Native
## Demo
## Features
- **Technologies**: React Native, Expo, Node.js
- **Authentication**: sign in/out using Google account
- **Navigation**: Home, Subscription, Library, Profile Screens accessible
- **Search**: query autocomplete suggestions, dynamic UI components
- **Video Query**: search results for videos are displayed with big thumbnails and relevant video information
- **Video Screen**: modal pops up to show video along with related channel and video information in addition to related video suggestions
- **Subscription**: view latest videos from subscribed channels
- **Library**: view or listen to your playlists
- **Scroll Events**: new suggestions appear automatically on scroll
- **Dynamic Components**: Search bar changes on focus/blur, header disappears and reappears on scroll, video screen modal is dismissable
## Implementation
- Videos were implemented with a WebView and Youtube's video embed API
- Channel and video queries used the **Youtube Data API**
- Authentication with Google used the **expo-auth-session/providers/google** library
- All other features were implemented with **React Native/Expo** libraries