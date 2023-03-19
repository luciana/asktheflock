const operation = (list1, list2, comparator) => {
  const set2 = new Set(list2.map((item) => item.id));

  return list1.filter((item1) => comparator(set2, item1.id));
};

const inBoth = (list1, list2) => operation(list1, list2, (set, id) => set.has(id));

const inFirstOnly = (list1, list2) =>
  operation(list1, list2, (set, id) => !set.has(id));

const inSecondOnly = (list1, list2) => inFirstOnly(list2, list1);

export { inBoth, inFirstOnly, inSecondOnly };
