const findCounts = (items, key, field) => {
  const counts = [];
  
  items.forEach((item) => {
    const matchingCount = counts.find((count) => count[key] === item[key]);

    if (matchingCount) {
      matchingCount[field] = item[field];
      matchingCount.value = (matchingCount.value || 0) + (item.value || 1);
    } else {
      counts.push({
        [key]: item[key],
        [field]: item[field],
        value: item.value || 1,
      });
    }
  });

  return counts;
};

export default findCounts;
