const EContentType = {
  Article: "Article",
  Exercise: "Exercise",
  ExerciseSet: "ExerciseSet",
  ExerciseProgression: "ExerciseProgression",
  Method: "Method",
  MethodSet: "MethodSet",
  MethodProgression: "MethodProgression",
} as const;
// pull out the keys of EContentType
export type ContentType = typeof EContentType[keyof typeof EContentType];
