import {SafeAreaView} from 'react-native';
import BasicHeader from '../components/BasicHeader';
import {containerStyle} from '../utils/utils';

const Search = () => {
  return (
    <SafeAreaView style={containerStyle}>
      <BasicHeader title={'검색페이지'} />
    </SafeAreaView>
  );
};

export default Search;
