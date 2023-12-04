import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Popover} from '../../../components/Popover/Popover';
import {PopoverAction} from '../../../components/Popover/type';
import Orientation from 'react-native-orientation-locker';

type ListProps = {};
const data = [0, 1, 2];
const actions: PopoverAction[] = [
  {text: 'option 1'},
  {text: 'option 2'},
  {text: 'option 3'},
];

export const List: React.FC<ListProps> = ({}) => {
  const select = (option: PopoverAction) => {
    console.log('select option = ', option);
  };

  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);

  return (
    <View style={styles.container}>
      {data.map(item => {
        return (
          <View style={styles.row} key={item}>
            <Popover
              actions={actions}
              onSelect={select}
              reference={
                <View style={styles.item}>
                  <Text>{1 + item * 3}</Text>
                </View>
              }
            />
            <Popover
              actions={actions}
              onSelect={select}
              reference={
                <View style={styles.item}>
                  <Text>{2 + item * 3}</Text>
                </View>
              }
            />
            <Popover
              actions={actions}
              onSelect={select}
              reference={
                <View style={styles.item}>
                  <Text>{3 + item * 3}</Text>
                </View>
              }
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 600,
    height: 300,
  },
  row: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    borderColor: 'red',
  },
  item: {
    width: 200,
    height: '100%',
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'red',
  },
});
