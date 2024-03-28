export const getDateDisplayFormat = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const getDateChartFormat = (date) => {
  var parts = date.split("-");
  var day = parts[0];
  var month = parts[1];
  var year = parts[2];

  var date = new Date(year, month - 1, day);
  var formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  return formattedDate;
};

export const getDateChartFormat2 = (date) => {
  var parts = date.split("-");
  var day = parts[2];
  var month = parts[1];
  var year = parts[0];

  var date = new Date(year, month - 1, day);
  var formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  return formattedDate;
};
