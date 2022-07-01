import { ActionTypes, ThunkType } from '../app/store'
import { FETCH_STUDENTS, SET_NEW_TAG, StudentType } from '../reducers/studentsReducer'
import * as api from '../api/api'

export const actionsStudents = {
  setUsersActionCreator: (students: Array<StudentType>) => ({
    type: FETCH_STUDENTS,
    payload: {
      students
    }
  } as const),
  setNewTagActionCreator: (tag: string, userId: string) => ({
    type: SET_NEW_TAG,
    payload: {
      tag,
      userId
    }
  } as const)
}

export type AuthActionType = ActionTypes<typeof actionsStudents>

export const fetchStudentsThunk = (): ThunkType<AuthActionType> => async (dispatch) => {
  try {
    const { data } = await api.fetchStudents()
    dispatch(actionsStudents.setUsersActionCreator(data.students))
  } catch (e) {
    console.log(e)
  }
}

export const setNewTagThunk = (tag: string, userId: string): ThunkType<AuthActionType> => async (dispatch) => {
  try {
    // here we need to call some async code to sent new tag to the backend using api, but now we just add teg in Redux store
    dispatch(actionsStudents.setNewTagActionCreator(tag, userId))
  } catch (e) {
    console.log(e)
  }
}


