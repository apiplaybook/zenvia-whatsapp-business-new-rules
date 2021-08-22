function formatUnitOfTime(unitOfTime: number) {
  return unitOfTime < 10 ? `0${unitOfTime}`.substring(0, 2) : unitOfTime.toString().substring(0, 2);
}

export default formatUnitOfTime