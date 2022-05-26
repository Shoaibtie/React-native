import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import DateHelper from '../../utils/dateHelperModule/dateHelper';

const dropDownOptions = ['4', '8', '12', '16', '20', '24', '30', '34', '40'];

const timing = [
  'Select',
  '12:00 AM',
  '12:30 AM',
  '01:00 AM',
  '01:30 AM',
  '02:00 AM',
  '02:30 AM',
  '03:00 AM',
  '03:30 AM',
  '04:00 AM',
  '04:30 AM',
  '05:00 AM',
  '05:30 AM',
  '06:00 AM',
  '06:30 AM',
  '07:00 AM',
  '07:30 AM',
  '08:00 AM',
  '08:30 AM',
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
  '07:30 PM',
  '08:00 PM',
  '08:30 PM',
  '09:00 PM',
  '09:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM',
];

function ServiceTime({data}) {
  const availability = useSelector(
    state => state.availability.availabilityDetails,
  );
  const [selectedLanguage, setPickerValue] = React.useState(
    availability.DesiredHoursPerWeek,
  );
  React.useEffect(() => {
    console.log('sds', data);
    // alert(JSON.stringify());
  });

  const defaltValue = availability.AvailabilityNote;
  const [note, setAvailabilityNote] = React.useState(defaltValue);

  const setDropdownValue = (text, value, index, timeType) => {
    let new_Value = value == 'Select' ? null : value;

    if (timeType === 'startTime') data[index].SelectedStartTime = new_Value;
    else data[index].SelectedEndTime = new_Value;
  };

  const handleAvailabilityNote = value => {
    availability.AvailabilityNote = value;
    setAvailabilityNote(value);
  };

  const setDesiredHoursPerWeek = (text, itemValue) => {
    availability.DesiredHoursPerWeek = itemValue;
    setPickerValue(itemValue);
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.4}}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <RenderUI
              item={item}
              index={index}
              setDropdownValue={setDropdownValue}
            />
          )}
          removeClippedSubviews={false}
          keyExtractor={item => item.Id}
        />
      </View>
      <View
        style={{
          flex: 0.3,
          flexDirection: 'row',
          marginVertical: '2%',
          padding: '1%',
        }}>
        <View style={{flex: 0.8}}>
          <Text style={[styles.textValueDesign, {fontWeight: '600'}]}>
            How many hours do you want to work per week?
          </Text>
        </View>
        <View
          style={[
            {flex: 0.2, justifyContent: 'space-around', alignItems: 'center'},
          ]}>
          {/* <Picker
                        selectedValue={selectedLanguage}
                        itemStyle={styles.pickerStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            setDesiredHoursPerWeek(itemValue)
                        }>
                        {dropDownOptions.map((item) => {
                            return (
                                <Picker.Item label={item.label} value={item.value} />
                            )
                        })}
                    </Picker> */}
          {/* <ModalDropdown
            defaultValue={selectedLanguage}
            options={dropDownOptions}
            isFullWidth={true}
            dropdownTextStyle={[styles.textStyle]}
            style={{borderColor: '#000', borderWidth: 1, padding: 5}}
            onSelect={(text, value) => setDesiredHoursPerWeek(text, value)}
          /> */}
          <ModalDropdown
            defaultValue={selectedLanguage}
            options={dropDownOptions}
            isFullWidth={true}
            dropdownTextStyle={[styles.textStyle]}
            showsVerticalScrollIndicator={false}
            style={{
              borderColor: '#000',
              borderWidth: 1,
              padding: 5,
              width: 60,
              marginLeft: 10,
              paddingLeft: 25,
              justifyContent: 'center',
            }}
            dropdownStyle={{
              width: 60,

              justifyContent: 'center',

              alignItems: 'center',

              marginRight: -6.5,

              marginTop: 5.5,
            }}
            onSelect={(text, value) => setDesiredHoursPerWeek(text, value)}
          />
        </View>
      </View>
      <View
        style={{
          flex: 0.3,
          flexDirection: 'row',
          marginVertical: '1%',
          padding: '1%',
          marginBottom: Platform.OS === 'ios' ? '-26%' : '-28%',
        }}>
        <View style={{flex: 1}}>
          <Text style={styles.textValueDesign}>Availability Note</Text>
          <TextInput
            style={styles.textInputStyle}
            multiline
            numberOfLines={4}
            defaultValue={note}
            onChangeText={text => handleAvailabilityNote(text)}
          />
          <View style={{height: 100}}></View>
        </View>
      </View>
    </View>
  );
}
function RenderUI({item, index, setDropdownValue}) {
  let selectedStartTime = item.SelectedStartTime
    ? DateHelper.timeConvert(item.SelectedStartTime)
    : 'Select';
  let selectedEndTime = item.SelectedEndTime
    ? DateHelper.timeConvert(item.SelectedEndTime)
    : 'Select';
  return (
    <View style={styles.cardDesign}>
      <View style={[styles.rowView]}>
        <View style={styles.dateView}>
          <Text>{item.Attribute}</Text>
        </View>
        <View style={[styles.dateView, {paddingTop: '0.7%'}]}>
          <ModalDropdown
            defaultValue={selectedStartTime}
            options={timing}
            isFullWidth
            dropdownTextStyle={styles.textStyle}
            onSelect={(text, value) =>
              setDropdownValue(text, value, index, 'startTime')
            }
          />
        </View>
        <View style={styles.blankView}></View>
        <View style={[{flex: 0.5, paddingTop: '0.7%'}]}>
          <ModalDropdown
            defaultValue={selectedEndTime}
            options={timing}
            isFullWidth
            dropdownTextStyle={styles.textStyle}
            onSelect={(text, value) =>
              setDropdownValue(text, value, index, 'endTime')
            }
          />
        </View>
        <View style={styles.blankView}></View>
      </View>
    </View>
  );
}

export default React.memo(ServiceTime);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardDesign: {
    borderRadius: 3,
    borderWidth: 0.5,
    shadowColor: '#000000',
    marginVertical: '1%',
    marginHorizontal: '1%',
    padding: '2%',
  },
  pickerStyle: {
    height: '80%',
    marginTop: '1%',
  },
  textInputStyle: {
    width: '100%',
    height: 60,
    // height: '20%',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'black',
    margin: '1%',
    color: '#000',
  },
  rowView: {
    flexDirection: 'row',
  },
  dateView: {
    flex: 0.4,
  },
  blankView: {
    flex: 0.1,
  },
  textValueDesign: {
    fontSize: 16,
  },
  textStyle: {
    fontSize: 15,
  },
});
