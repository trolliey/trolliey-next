export const renderWeight = (total_weight) => {
  if (total_weight <= 5) {
    return 10
  }
  if (total_weight > 5 && total_weight <= 10) {
    return 13
  }
  if (total_weight > 10 && total_weight <= 15) {
    return 15
  }
  if (total_weight > 15 && total_weight <= 20) {
    return 30
  }
  if (total_weight > 30 && total_weight <= 50) {
    return 40
  }
}
