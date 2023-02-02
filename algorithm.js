//find index of the maximum value in an array
let findMaxIndex = function(arr){
    let indexOfMax = 0;
    let max = 0;
  
    // find the index of the max score;
    if(arr.length > 1){
      for(let i = 0; i < arr.length; i++){
        if(arr[i] >= max){
          indexOfMax = i;
          max = arr[i]
        }
      }
    }
    return indexOfMax;
  }
  
  //find index of the minimum value in an array
  let findMinIndex = function(arr){
    let indexOfMin = 0;
    let min = 0;
  
    // find the index of the max score;
    if(arr.length > 1){
      for(let i = 0; i < arr.length; i++){
        if(arr[i] <= min){
          indexOfMin = i;
          min = arr[i]
        }
      }
    }
  
    return indexOfMin;
  }