import * as constants from '../../appResources/constants';

const ArrayFilterHelper = {

  // Function to remove duplicates values in array of objects
  reduceArray: (dataArary) => {
    let reduceList = [];

    dataArary && dataArary.forEach(function (careDetail) {
      let carelist = [];

      carelist.title = careDetail.Questions.trim();
      reduceList.push(carelist);

    })
    var result = reduceList.reduce((unique, o) => {
      if (!unique.some(obj => obj.title === o.title)) {
        unique.push(o);
      }
      return unique;
    }, []);
    return result;
  },

  // Function to handle filters in array
  filterArray: (titleContent, dataArary, screen) => {
    let filterList = [];

    titleContent.map((item) => {
      let dataExist = dataArary.filter(
        (eachDetail) => screen === 'carePlan' ? eachDetail.Questions.trim() === item.title : eachDetail.Questions.trim() === item.title ,
      );
      if (dataExist !== undefined && dataExist.length > 0) {
        filterList.push(dataExist);
      }
    });
    return filterList;
  },

  SelectedArrayByClient: (data) => {
    let dataList = [];
    let count = 0;
    data && data.forEach(function (careDetail) {
      if (!careDetail[0].IsChecked) {
        count++;
      }
    })
    if(count == data.length){
       dataList = [
         {noRecord: constants.CAREGIVER_SCHEDULE.RECORD}
       ]
    }
    return dataList;
  }
};

export default ArrayFilterHelper;
