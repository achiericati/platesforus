export const getDaysBetween = (start: string, end: string): string[] => {
    const startDate = new Date(start);
    const endDateObj = new Date(end);
    const days: string[] = [];
  
    while (startDate <= endDateObj) {
      days.push(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1);
    }
  
    return days;
  };

export const getRandomInt = (max: number) => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  };