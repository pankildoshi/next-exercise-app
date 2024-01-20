import { Schema, model, models } from "mongoose";

const WorkoutSchema = new Schema({
  workout: {
    type: String,
    required: [true, "Wprkout name is required"],
  },
  userId: {
    type: String,
    required: true,
  },
});

const Workout = models.Workout || model("Workout", WorkoutSchema);

export default Workout;
