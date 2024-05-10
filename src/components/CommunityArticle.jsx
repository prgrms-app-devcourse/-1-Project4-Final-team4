import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';

import palette from '../utils/Colors';

const likeOff = require('../assets/icons/likeOff.png');
const likeOn = require('../assets/icons/likeOn.png');
const comment = require('../assets/icons/comment.png');
const cancel = require('../assets/icons/cancel.png');
const send = require('../assets/icons/send.png');
const mainSample = require('../assets/images/sample.png');

const {width, height} = Dimensions.get('window');

const dummy_image = [mainSample, mainSample, mainSample];

const CommunityArticle = ({data}) => {
  const [like, setLike] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [commentValue, setCommentValue] = useState('');

  const likeArray = data.likes;

  const renderComment = ({item}) => {
    return (
      <View style={styles.commentList}>
        <Image source={item.profile} style={styles.commentProfile} />
        <View style={styles.commentTextWrapper}>
          <Text style={styles.commentUserName}>{item.name}</Text>
          <Text style={styles.commentContent}>{item.comment}</Text>
        </View>
      </View>
    );
  };

  const countLike = () => {
    if (!likeArray.includes(data.id)) {
      likeArray.push(data.id);
    } else if (likeArray.includes(data.id)) {
      const idx = likeArray.indexOf(data.id);
      likeArray.splice(idx, 1);
    }
    setLike(!like);
  };

  const renderImage = ({item}) => {
    return <Image source={item} style={styles.imageStyle} />;
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
        <FlatList
          data={dummy_image}
          renderItem={renderImage}
          horizontal={true}
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
        />
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
              />
            </TouchableOpacity>
            <Text style={styles.iconText}>{data.likes.length}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              <Image
                source={comment}
                style={styles.iconStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.iconText}>{data.commentList.length}</Text>
          </View>
        </View>
      </View>
      <Modal
        useNativeDriver
        isVisible={isVisible}
        backdropColor="black"
        backdropOpacity={0.5}
        onBackdropPress={() => setIsVisible(!isVisible)}
        hideModalContentWhileAnimating
        style={styles.modalWrapper}>
        <View style={styles.modalStyle}>
          <View style={styles.modalHeader}>
            <View />
            <Text style={styles.modelTitle}>댓글</Text>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              <Image source={cancel} style={{width: 24, height: 24}} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data.commentList}
            renderItem={renderComment}
            keyExtractor={item => item.id}
            removeClippedSubviews
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.modalCommentWrapper}>
            <View style={styles.commentInputWrapper}>
              <TextInput
                multiline
                maxLength={200}
                placeholder="댓글을 입력하세요."
                placeholderTextColor={palette.COMMUNITY_GRAY}
                autoCapitalize="none"
                spellCheck={false}
                autoCorrect={false}
                style={styles.commentInput}
                value={commentValue}
                onChangeText={text => setCommentValue(text)}
              />
              <TouchableOpacity>
                <Image source={send} style={{width: 40, height: 40}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    color: palette.COMMUNITY_BLACK,
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
    color: palette.COMMUNITY_BLACK,
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
    color: palette.COMMUNITY_BLACK,
  },
  modalWrapper: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalStyle: {
    width,
    height: (height * 2) / 3,
    backgroundColor: palette.BG,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  modelTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: palette.COMMUNITY_BLACK,
  },
  modalCommentWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  commentInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 150,
  },
  commentInput: {
    width: width - 80,
    minHeight: 40,
    maxHeight: 120,
    paddingLeft: 20,
    borderRadius: 50,
    backgroundColor: '#EEE',
  },
  commentList: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  commentProfile: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  commentTextWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  commentUserName: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: palette.COMMUNITY_BLACK,
  },
  commentContent: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: palette.COMMUNITY_BLACK,
  },
});

export default CommunityArticle;
