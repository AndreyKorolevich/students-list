import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import styles from './App.module.scss'
import { fetchStudentsThunk, setNewTagThunk } from './actions/studentsAction'
import { getStudentsSelector } from './Selectors/studentsSelector'
import Student from './components/Student'
import { StudentType } from './reducers/studentsReducer'


type AppType = {}
type SetTimeoutType = ReturnType<typeof setTimeout>
type SearchParamsType = {
  tag: string,
  name: string
}

const App: React.FC<AppType> = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector<Array<StudentType>>(getStudentsSelector)
  const [students, setStudents] = useState<Array<StudentType>>([])
  const [nameValue, setNameValue] = useState<string>('')
  const [tagValue, setTagValue] = useState<string>('')
  const [timerId, setTimerId] = useState<SetTimeoutType | null>(null)

  useEffect(() => {
    dispatch(fetchStudentsThunk())
  }, [])

  useEffect(() => {
    setStudents(data)
  }, [data])

  const debounce = (params: SearchParamsType) => {
    if (timerId) {
      clearTimeout(timerId)
    }
    const delayFunction: SetTimeoutType = setTimeout(() => {
      onSearch(params)
    }, 300)
    setTimerId(delayFunction)
  }

  const onSearch = (params: SearchParamsType) => {
    const preparedName = params.name.toLocaleLowerCase().trim()
    const preparedTag = params.tag.toLocaleLowerCase().trim()
    let newStudents: Array<StudentType> = data
    if (preparedName !== '' && preparedTag !== '') {    // if bot inputs are not empty apply all the filters
      newStudents = data.filter((student: StudentType) => {
        if (student.firstName.toLocaleLowerCase().includes(preparedName)
          || student.lastName.toLocaleLowerCase().includes(preparedName)) {
          const lenTags = student.tags ? student.tags.length : 0
          for (let i = 0; i < lenTags; i++) {
            if (student.tags && student.tags[i].includes(preparedTag)) {
              return true
            }
          }
        }
      })
    } else if (preparedName !== '') {
      newStudents = data.filter((student: StudentType) => {
        if (student.firstName.toLocaleLowerCase().includes(preparedName)
          || student.lastName.toLocaleLowerCase().includes(preparedName)) {
          return true
        }
      })
    } else if (preparedTag !== '') {
      newStudents = data.filter((student: StudentType) => {
        const lenTags = student.tags ? student.tags.length : 0
        for (let i = 0; i < lenTags; i++) {
          if (student.tags && student.tags[i].includes(preparedTag)) {
            return true
          }
        }
      })
    }
    setStudents(newStudents)

  }

  const onChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTagValue(value)
    debounce({
      tag: value,
      name: nameValue
    })
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNameValue(value)
    debounce({
      tag: tagValue,
      name: value
    })
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <input className={styles.input} value={nameValue} type={'text'} onChange={onChangeName}
               placeholder={'Search by name'}/>
        <input className={styles.input} value={tagValue} type={'text'} onChange={onChangeTag}
               placeholder={'Search by tag'}/>
      </header>
      <div className={styles.main}>
        {students && students.map(student => <Student key={student.id} {...student}/>)}
        <div className={styles.box}/>
      </div>
    </div>
  )
}

export default App
