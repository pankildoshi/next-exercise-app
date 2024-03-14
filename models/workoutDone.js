import { Schema, model, models } from "mongoose";

const WorkoutDoneSchema = new Schema({
  name: {
    type: String,
    required: [true, "Workout name is required"],
  },
  userId: {
    type: String,
    required: true,
  },
  exercisesDone: {
    type: Array,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
  },
});

const WorkoutDone =
  models.WorkoutDone || model("WorkoutDone", WorkoutDoneSchema);

export default WorkoutDone;
