import { AuthActionType } from '../actions/studentsAction'

export const FETCH_STUDENTS = 'FETCH_STUDENTS'
export const SET_NEW_TAG = 'SET_NEW_TAG'

export type StudentType = {
  city: string,
  company: string,
  email: string
  firstName: string,
  grades: Array<number>
  id: string,
  lastName: string,
  pic: string,
  skill: string,
  tags?: Array<string>
}

type AuthStateType = {
  students: Array<StudentType>,
}

const initialState = {
  students: []
}

export default (state: AuthStateType = initialState, action: AuthActionType) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return {
        ...state,
        students: action.payload.students
      }
    case SET_NEW_TAG:
      return {
        ...state,
        students: state.students.map(student => {
            if(student.id === action.payload.userId){
                return {
                    ...student,
                    tags: student.tags ? [...student.tags, action.payload.tag] : [action.payload.tag]
                }
            }else{
                return student
            }
        })
      }
    default:
      return state
  }
}