const months: { [key: number]: string } = {
  1: "იანვარი",
  2: "თებერვალი",
  3: "მარტი",
  4: "აპრილი",
  5: "მაისი",
  6: "ივნისი",
  7: "ივლისი",
  8: "აგვისტო",
  9: "სექტემბერი",
  10: "ოქტომბერი",
  11: "ნოემბერი",
  12: "დეკემბერი",
};

export const convertMonthStringToDate = (month: string, year: number) => {
  const monthNumber = Object.keys(months).find(
    (key) => months[parseInt(key)] === month,
  );
  return new Date(year, parseInt(monthNumber as string) - 1);
};
