import { Schema, model, models } from "mongoose";

const WorkoutExerciseSchema = new Schema({
  workoutId: {
    type: String,
    required: true,
  },
  exerciseId: {
    type: String,
    required: true,
  },
});

const WorkoutExercise =
  models.WorkoutExercise || model("WorkoutExercise", WorkoutExerciseSchema);

export default WorkoutExercise;
