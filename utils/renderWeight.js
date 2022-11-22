export const renderWeight = (total_weight) => {
  if(total_weight === 0){
    return 0
  }
  if (total_weight <= 5) {
    return 7
  }
  if (total_weight > 5 && total_weight <= 10) {
    return 10
  }
  if (total_weight > 10 && total_weight <= 15) {
    return 13
  }
  if (total_weight > 15 && total_weight <= 20) {
    return 25
  }
  if (total_weight > 30 && total_weight <= 50) {
    return 30
  }
  if (total_weight > 50 && total_weight <= 100) {
    return 35
  }
  if (total_weight > 50 && total_weight <= 100) {
    return 40
  }
}
