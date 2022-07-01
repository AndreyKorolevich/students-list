import { RootStateType } from "../app/store";

export const getStudentsSelector = (state: RootStateType) => state.studentsReducer.students

