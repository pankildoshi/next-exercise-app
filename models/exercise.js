import { Schema, model, models } from "mongoose";

const ExerciseSchema = new Schema({
  bodyPart: { type: String },
  equipment: { type: String },
  gifUrl: { type: String },
  id: { type: String },
  name: { type: String },
  target: { type: String },
  secondaryMuscles: { type: Array },
  instructions: { type: Array },
});

const Exercise = models.Exercise || model("Exercise", ExerciseSchema);

export default Exercise;
