import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import palette from '../utils/Colors';
import Category from './Category';

const bookmark = require('../assets/icons/bookmark.png');
const like = require('../assets/icons/like.png');
const comment = require('../assets/icons/comment.png');

const {width} = Dimensions.get('window');

const CommunityArticle = ({
  profile,
  name,
  date,
  image,
  body,
  hash,
  likeCount,
  commentCount,
}) => {
  return (
    <View style={{gap: 10, marginHorizontal: 16}}>
      <View style={styles.headerStyle}>
        <View style={styles.profileWrapper}>
          <Image source={profile} style={styles.profileImage} />
          <View>
            <Text style={styles.idText}>{name}</Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image source={bookmark} style={{width: 20, height: 27}} />
        </TouchableOpacity>
      </View>
      <View style={{gap: 8}}>
        <Image source={image} style={styles.imageStyle} />
        <View style={styles.categoryWrapper}>
          <Category name={'맛집'} />
          <Category name={'영화'} />
        </View>
        <View>
          <Text style={styles.bodyText}>{body}</Text>
          <Text style={styles.hashText}>{hash}</Text>
        </View>
        <View style={styles.iconWrapper}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity>
              <Image
                source={like}
                style={styles.iconStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.iconText}>{likeCount}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity>
              <Image
                source={comment}
                style={styles.iconStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.iconText}>{commentCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  idText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    color: '#333',
  },
  dateText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
    color: '#AAA',
  },
  imageStyle: {
    width: width - 32,
    height: width - 32,
    borderRadius: 15,
  },
  categoryWrapper: {
    flexDirection: 'row',
    gap: 4,
  },
  bodyText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#333',
  },
  hashText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    color: palette.MAIN_GREEN,
  },
  iconWrapper: {
    flexDirection: 'row',
    gap: 4,
  },
  iconStyle: {
    width: 18,
    height: 16,
  },
  iconText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 10,
    color: '#333',
  },
});

export default CommunityArticle;
