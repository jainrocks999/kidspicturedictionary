import React from 'react';
import {FlatList} from 'react-native';
import utils from '../../utils';
import Card from '../Card';
type props = {
  data: typeof utils.Categoreis;
  onPress: (item: (typeof utils.Categoreis)[0]) => void;
};
const CategoryList: React.FC<props> = ({data, onPress}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      data={data}
      numColumns={2}
      keyExtractor={item => item._id.toString()}
      renderItem={({item}) => (
        <Card
          onPress={() => {
            onPress(item);
          }}
          item={item}
        />
      )}
    />
  );
};

export default CategoryList;
