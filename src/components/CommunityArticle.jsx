import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const likeOff = require('../assets/icons/likeOff.png');
const likeOn = require('../assets/icons/likeOn.png');
const comment = require('../assets/icons/comment.png');

const {width} = Dimensions.get('window');

const CommunityArticle = ({data}) => {
  const [like, setLike] = useState(data.likes.length);

  const likeArray = data.likes;

  const countLike = () => {
    if (!likeArray.includes(data.id)) {
      likeArray.push(data.id);
    } else if (likeArray.includes(data.id)) {
      const idx = likeArray.indexOf(data.id);
      likeArray.splice(idx, 1);
    }
    setLike(!like);
  };

  return (
    <View style={{gap: 10, marginHorizontal: 16}}>
      <View style={styles.headerStyle}>
        <View style={styles.profileWrapper}>
          <Image source={data.profile} style={styles.profileImage} />
          <View>
            <Text style={styles.idText}>{data.name}</Text>
            <Text style={styles.dateText}>{data.date}</Text>
          </View>
        </View>
      </View>
      <View style={{gap: 8}}>
        <Image source={data.image} style={styles.imageStyle} />
        <View style={styles.categoryWrapper}>
          <Text style={styles.categoryText}>#맛집</Text>
          <Text style={styles.categoryText}>#영화</Text>
        </View>
        <Text style={styles.bodyText}>{data.body}</Text>
        <View style={styles.iconWrapper}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={countLike}>
              <Image
                source={like ? likeOn : likeOff}
                style={styles.iconStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.iconText}>{data.likes.length}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity>
              <Image
                source={comment}
                style={styles.iconStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.iconText}>{data.commentCount}</Text>
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
    fontSize: 12,
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
  categoryText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: '#AAA',
  },
  bodyText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: '#333',
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
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#333',
  },
});

export default CommunityArticle;
