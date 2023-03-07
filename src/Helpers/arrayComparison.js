// Generic helper function that can be used for the three operations:        
const operation = (list1, list2, isUnion = false) =>
list1.filter(
    (set => a => isUnion === set.has(a.id))(new Set(list2.map(b => b.id)))
);

// https://stackoverflow.com/questions/33356504/difference-and-intersection-of-two-arrays-containing-objects
const inBoth = (list1, list2) => operation(list1, list2, true),
  inFirstOnly = operation,
  inSecondOnly = (list1, list2) => inFirstOnly(list2, list1);



export { inBoth, inFirstOnly, inSecondOnly };