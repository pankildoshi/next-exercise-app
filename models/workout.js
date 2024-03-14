import { Schema, model, models } from "mongoose";

const WorkoutSchema = new Schema({
  name: {
    type: String,
    required: [true, "Workout name is required"],
  },
  userId: {
    type: String,
    required: true,
  },
  exercises: {
    type: Array,
  },
});

const Workout = models.Workout || model("Workout", WorkoutSchema);

export default Workout;
