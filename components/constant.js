import { createContext } from 'react';
import { StyleSheet } from 'react-native';

const HEADER_HEIGHT = 40;
const PADDING = 5;
const PADDING_BOTTOM = 3;
const BOTTOM_SCROLL_PADDING = 10;
const GLOBAL_STYLES = StyleSheet.create({
  safeareaview: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16,
  },
  info: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 13,
    color: '#6b6b6b',
  },
  titlenf: {
    flexWrap: 'wrap',
    fontSize: 16,
    lineHeight: 24,
  },
  infonf: {
    flexWrap: 'wrap',
    fontSize: 13,
    color: '#6b6b6b',
    lineHeight: 20,
  },
});

const GRAY = '#e9e9f1';

const AccessTokenContext = createContext({
  accessToken: '',
  setAccessToken: () => {}
});

const FETCH_THROTTLE = 500;

const FETCH_HEADER = {
  "Accept-Encoding": "gzip",
  "User-Agent": "VGP (gzip)",
};

export { HEADER_HEIGHT, PADDING, PADDING_BOTTOM, GLOBAL_STYLES, BOTTOM_SCROLL_PADDING, GRAY, AccessTokenContext, FETCH_THROTTLE, FETCH_HEADER };