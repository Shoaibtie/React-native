import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import toastAlert from '../../utils/toastModule/tosatAlert';
import {useFocusEffect} from '@react-navigation/native';
function useForceUpdate() {
  const [value, setValue] = React.useState(0);
  return () => setValue(value => value + 1);
}

export default function CaregiverVisitForm({item, listType, props, data}) {
  const [inputs, setInputs] = React.useState();
  const [selectedValue, setSelectedValue] = React.useState(item);
  const [unit, setUnitValue] = React.useState(item.Unit);
  const [bill, setBillValue] = React.useState(item.BillRate);
  const [pay, setPayValue] = React.useState(item.PayRate);
  const [screen, setScreen] = React.useState();
  const [commentValue, setCommentValue] = React.useState(item.Comment);

  const scheduleData = useSelector(
    state => state.caregiverSchedule.scheduleData,
  );
  const index = useSelector(state => state.indexValue.index);
  const forceUpdate = useForceUpdate();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (listType !== 'additionalItemView') {
          let data = [];
          item.map((value, index) => {
            let obj = {
              id: index,
              refused: false,
              notDoneNA: false,
              completed: false,
            };

            data.push(obj);
          });
          setInputs(data);
        }
        if (props.route.params) setScreen(props.route.params.screen);
      };
    }, []),
  );
  React.useEffect(() => {
    if (listType !== 'additionalItemView') {
      let data = [];
      item.map((value, index) => {
        let obj = {
          id: index,
          refused: false,
          notDoneNA: false,
          completed: false,
        };

        data.push(obj);
      });
      setInputs(data);
    }
    if (props.route.params) setScreen(props.route.params.screen);
  }, []);

  const navigationHandler = item => {
    saveEditedData();
    props.navigation.navigate('EditVisitDetails', {
      item: item,
      buttonData: inputs,
    });
  };

  const onChangeHandler2 = (name, dataIndex) => {
    // let selectedValue = name === 'refused' ? !inputs[dataIndex].refused : name === 'notDoneNA' ? !inputs[dataIndex].notDoneNA : !inputs[dataIndex].completed;
    let data = ['refused', 'notDoneNA', 'completed'];
    inputs.map((value, index) => {
      if (index === dataIndex) {
        data.map(value => {
          if (value === name) {
            setInputs(state => ({...state, [name]: !inputs[name]}), []);
            item[0].SelectedAnswer =
              name === 'refused'
                ? 2
                : name === 'notDoneNA'
                ? 3
                : name === 'completed'
                ? 1
                : 0;
          } else {
            setInputs(state => ({...state, [value]: false}), []);
          }
        });
      }
    });
    saveEditedData(dataIndex);
  };

  const onChangeHandler = (name, dataIndex) => {
    let selectedValue = !inputs[name];
    let updatedInputs = [];
    if (name === 'completed') {
      updatedInputs = [
        {
          id: dataIndex,
          refused: false,
          notDoneNA: false,
          completed: selectedValue,
        },
      ];
    } else if (name === 'notDoneNA') {
      updatedInputs = [
        {
          id: dataIndex,
          refused: false,
          notDoneNA: selectedValue,
          completed: false,
        },
      ];
    } else if (name === 'refused') {
      updatedInputs = [
        {
          id: dataIndex,
          refused: selectedValue,
          notDoneNA: false,
          completed: false,
        },
      ];
    }
    const res = inputs.map(
      (obj, index) => updatedInputs.find(o => o.id == obj.id) || obj,
    );

    item[dataIndex].SelectedAnswer =
      name === 'refused'
        ? 2
        : name === 'notDoneNA'
        ? 3
        : name === 'completed'
        ? 1
        : 0;
    setInputs(res);
    forceUpdate();
    saveEditedData(dataIndex);
  };

  const saveEditedData = async dataIndex => {
    item[0].PossibleAnswers.map((value, index) => {
      switch (value.Text) {
        case '1':
          return (value.IsSelected = inputs[dataIndex].completed);
          break;
        case '2':
          return (value.IsSelected = inputs[dataIndex].refused);
          break;
        case '3':
          return (value.IsSelected = inputs[dataIndex].notDoneNA);
        default:
      }
    });
  };

  const handleChange = value => {
    if (item.Id === selectedValue.Id) {
      value.IsSelected = !value.IsSelected;
    }
    setSelectedValue(value);
    forceUpdate();
  };

  const unitChangeHandle = text => {
    // if(text-text == 0) {
    //   setUnitValue(text);
    //   item.Unit = text;
    // } else {
    //   setUnitValue('')
    // }
    item.Unit = text;
    setUnitValue(text);
  };

  const billChangeHandle = text => {
    // if(text-text == 0) {
    //   setBillValue(text);
    //   item.BillRate = text;
    // } else {
    //   setBillValue('');
    // }
    item.BillRate = text;
    setBillValue(text);
  };

  const payChangeHandle = text => {
    // if(text-text == 0) {
    //   setPayValue(text);
    //   item.PayRate = text;
    // } else {
    //   setPayValue('')
    // }
    item.PayRate = text;
    setPayValue(text);
  };

  const commentHandler = text => {
    item.Comment = text;
    setCommentValue(text);
  };

  const commentScreenVisibilityHandler = comment => {
    props.navigation.navigate('noteScreen', {
      comment: comment,
    });
  };

  const toastMessageHandler = () => {
    if (screen !== 'previousVisits')
      toastAlert.toastMessage('Please Check-In first');
  };

  return (
    <View style={styles.flatlistViewDesign}>
      <View style={styles.cardDesign}>
        {listType === 'additionalItemView' ? (
          <>
            <View style={styles.rowDirectionDesign}>
              <View
                style={[
                  styles.columnDirectionDesign,
                  {flex: 0.1, alignItems: 'flex-start'},
                ]}>
                <TouchableOpacity
                  onPress={
                    scheduleData[index].Status === 'Scheduled' ||
                    screen === 'previousVisits'
                      ? () => toastMessageHandler()
                      : () => handleChange(selectedValue)
                  }
                  style={{marginTop: -4, marginRight: 5}}>
                  {item.IsSelected ? (
                    <MaterialCommunityIcons name="checkbox-marked" size={23} />
                  ) : (
                    <MaterialCommunityIcons
                      name="checkbox-blank-outline"
                      size={23}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View style={[styles.columnDirectionDesign, {flex: 0.9}]}>
                <Text style={[styles.textDesign]}>{item.ServiceCode}</Text>
              </View>
            </View>
            <View style={[styles.rowDirectionDesign, {marginTop: 10}]}>
              <View
                style={[
                  styles.columnDirectionDesign,
                  styles.commonStyle,
                  {flex: 3, backgroundColor: 'transparent'},
                ]}>
                <Text style={[styles.textDesign]}>Unit</Text>
                <TextInput
                  value={item.Unit.toString()}
                  editable={
                    item.IsSelected && screen !== 'previousVisits'
                      ? true
                      : false
                  }
                  style={styles.textInputStyle}
                  keyboardType="numeric"
                  onChangeText={text => unitChangeHandle(text)}
                />
              </View>
              <View
                style={[
                  styles.columnDirectionDesign,
                  styles.commonStyle,
                  {flex: 3, backgroundColor: 'transparent'},
                ]}>
                <Text style={[styles.textDesign]}>Bill Rate</Text>
                <TextInput
                  value={item.BillRate.toString()}
                  editable={
                    item.IsSelected && screen !== 'previousVisits'
                      ? true
                      : false
                  }
                  style={styles.textInputStyle}
                  keyboardType="numeric"
                  onChangeText={text => billChangeHandle(text)}
                />
              </View>
              <View
                style={[
                  styles.columnDirectionDesign,
                  styles.commonStyle,
                  {flex: 3, backgroundColor: 'transparent'},
                ]}>
                <Text style={[styles.textDesign]}>Pay Rate</Text>
                <TextInput
                  value={item.PayRate.toString()}
                  editable={
                    item.IsSelected && screen !== 'previousVisits'
                      ? true
                      : false
                  }
                  style={styles.textInputStyle}
                  keyboardType="numeric"
                  onChangeText={text => payChangeHandle(text)}
                />
              </View>
            </View>
            <View>
              <TextInput
                placeholder="Comments"
                placeholderTextColor="gray"
                value={commentValue}
                editable={
                  item.IsSelected && screen !== 'previousVisits' ? true : false
                }
                style={styles.commentInputStyle}
                onChangeText={text => commentHandler(text)}
              />
            </View>
          </>
        ) : (
          <>
            <View style={{flex: 1}}>
              <View style={{marginBottom: '3%'}}>
                <Text style={styles.textDesign}>{item[0].Questions}</Text>
              </View>
              <FlatList
                data={item}
                renderItem={({item, index}) => (
                  <FlatListItem
                    item={item}
                    navigationHandler={navigationHandler}
                    onChangeHandler={onChangeHandler}
                    inputs={inputs}
                    toastMessageHandler={toastMessageHandler}
                    dataIndex={index}
                    screen={screen}
                  />
                )}
                extraData={inputs}
                keyExtractor={value => value.SelectedAnswersSet}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

function FlatListItem({
  item,
  navigationHandler,
  onChangeHandler,
  inputs,
  toastMessageHandler,
  dataIndex,
  screen,
}) {
  const scheduleData = useSelector(
    state => state.caregiverSchedule.scheduleData,
  );
  const index = useSelector(state => state.indexValue.index);
  let refusedValue =
    inputs != undefined && inputs.length > 0 && inputs[dataIndex].refused
      ? true
      : item.SelectedAnswer == 2
      ? true
      : false;
  let notDoneNAValue =
    inputs != undefined && inputs.length > 0 && inputs[dataIndex].notDoneNA
      ? true
      : item.SelectedAnswer == 3
      ? true
      : false;
  let completedValue =
    inputs != undefined && inputs.length > 0 && inputs[dataIndex].completed
      ? true
      : item.SelectedAnswer == 1
      ? true
      : false;

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 5, flexDirection: 'row'}}>
        <View style={{flex: 5}}>
          <Text>{item.SelectedAnswersSet}</Text>
        </View>
        <View style={{flex: 5}}>
          <Text>
            {item.FrequencyKey === 'A'
              ? 'As Needed'
              : item.FrequencyKey === 'C'
              ? 'Client Request'
              : item.FrequencyKey === 'E'
              ? 'Each Visit'
              : null}
          </Text>
        </View>
      </View>
      <View style={{flex: 5, flexDirection: 'row', alignItems: 'flex-end'}}>
        <View style={{flex: 2}}></View>
        <TouchableOpacity
          onPress={
            (scheduleData && scheduleData[index].Status === 'Scheduled') ||
            screen === 'previousVisits'
              ? () => toastMessageHandler()
              : () => navigationHandler(item)
          }
          style={{flex: 2}}>
          <Foundation name="clipboard-notes" size={23} color="red" />
        </TouchableOpacity>
        <View style={{flex: 2}}>
          <MaterialIcons
            name="cancel"
            size={23}
            onPress={
              (scheduleData && scheduleData[index].Status === 'Scheduled') ||
              screen === 'previousVisits'
                ? () => toastMessageHandler()
                : value => onChangeHandler('refused', dataIndex)
            }
            color={refusedValue ? 'red' : 'gray'}
          />
        </View>
        <View style={{flex: 2}}>
          <MaterialIcons
            name="block"
            size={23}
            onPress={
              (scheduleData && scheduleData[index].Status === 'Scheduled') ||
              screen === 'previousVisits'
                ? () => toastMessageHandler()
                : value => onChangeHandler('notDoneNA', dataIndex)
            }
            color={notDoneNAValue ? 'red' : 'gray'}
          />
        </View>
        <View style={{flex: 2}}>
          <MaterialIcons
            name="check-circle"
            size={23}
            onPress={
              (scheduleData && scheduleData[index].Status === 'Scheduled') ||
              screen === 'previousVisits'
                ? () => toastMessageHandler()
                : value => onChangeHandler('completed', dataIndex)
            }
            color={completedValue ? 'green' : 'gray'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowDirectionDesign: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 5,
  },
  columnDirectionDesign: {
    flexDirection: 'column',
  },
  textDesign: {
    fontWeight: 'bold',
  },
  commonStyle: {
    alignItems: 'center',
  },
  flatlistViewDesign: {
    flex: 1,
    marginHorizontal: '2%',
    marginVertical: '2.5%',
  },
  cardDesign: {
    flex: 1,
    borderRadius: 2,
    borderWidth: 0.1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    padding: 10,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  iconsStyle: {
    width: 30,
    height: 30,
  },
  checkedIconStyle: {
    width: 25,
    height: 25,
  },
  commentIconsStyle: {
    width: 25,
    height: 25,
  },
  textInputStyle: {
    width: '88%',
    borderColor: '#000',
    borderWidth: 1,
    color: '#000',
    height: '48%',
    marginTop: '7%',
  },
  commentInputStyle: {
    borderColor: '#000',
    borderBottomWidth: 1,
    color: '#000',
    height: '48%',
  },
});
