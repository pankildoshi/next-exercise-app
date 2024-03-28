import {
  getDateChartFormat,
  getDateChartFormat2,
  getDateDisplayFormat,
} from "./date";

const getTotalkgs = (workout) => {
  let total = 0;
  for (let exercise of workout.exercisesDone) {
    total += exercise.totalkgs;
  }
  return total;
};

export const getWeightsData = (workouts) => {
  const dates = [];
  const weights = [];

  var today = new Date();
  for (var i = 6; i >= 0; i--) {
    var d = new Date(today);
    d.setDate(today.getDate() - i);
    const currDate = getDateDisplayFormat(d.toISOString());

    let kgs = 0;
    for (var workout of workouts) {
      const workoutDate = getDateDisplayFormat(workout.date);
      if (workoutDate === currDate) {
        kgs += getTotalkgs(workout);
      }
    }

    dates.push(getDateChartFormat(currDate));
    weights.push(kgs);
  }

  return [dates, weights];
};

export const getWorkoutsPerWeek = (workouts) => {
  const dates = [];
  for (var workout of workouts) {
    dates.push(workout.date);
  }

  const counts = countDatesByWeeks(dates);

  const weekStarts = [];
  const workoutsPerWeek = [];
  for (const [weekStart, count] of Object.entries(counts)) {
    weekStarts.unshift(getDateChartFormat2(weekStart));
    workoutsPerWeek.unshift(count);
  }

  return [weekStarts, workoutsPerWeek];
};

function countDatesByWeeks(dates) {
  const today = new Date();
  const weeksAgo = 7;

  const weekStartDates = [];
  const counts = {};

  for (let i = 0; i < weeksAgo; i++) {
    const dayOfWeek = today.getDay();
    const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const weekStartDate = new Date(today);
    weekStartDate.setDate(today.getDate() + 1 - offset - i * 7);
    weekStartDate.setHours(0, 0, 0, 0);
    weekStartDates.push(weekStartDate.toISOString().split("T")[0]);
    counts[weekStartDate.toISOString().split("T")[0]] = 0;
  }

  dates.forEach((date) => {
    const dateObj = new Date(date);
    for (const weekStartDate of weekStartDates) {
      if (dateObj >= new Date(weekStartDate)) {
        counts[weekStartDate]++;
        break;
      }
    }
  });

  return counts;
}
