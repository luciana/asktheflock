import { GENERATIONS } from "../Constants";

const findGeneration = (birthdate) => {
  const year = birthdate.getFullYear();
  const generation = GENERATIONS.find((gen) => year >= gen.start && year <= gen.end);
  return generation ? generation.label : 'Unknown';
};

export default findGeneration;
