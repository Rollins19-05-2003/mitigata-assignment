  export const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('/').map(Number); // Extract day, month, year
    return new Date(year, month - 1, day); // Create proper Date object
  };
  