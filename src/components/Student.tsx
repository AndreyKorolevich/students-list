import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import styles from './Student.module.scss'
import { StudentType } from '../reducers/studentsReducer'
import classname from 'classnames'
import { useAppDispatch } from '../app/hooks'
import { setNewTagThunk } from '../actions/studentsAction'

const Student: React.FC<StudentType> = ({ firstName, lastName, tags, city, company, email, grades, id, pic, skill }) => {
  const sum = grades.reduce((prev, cur) => Number(prev) + Number(cur), 0)
  const average = sum / grades.length

  const [isOpenGrades, setIsOpenGrades] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const dispatch = useAppDispatch()

  const onClick = () => {
    setIsOpenGrades(!isOpenGrades)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.code === 'Enter'){
      dispatch(setNewTagThunk(inputValue.trim(), id))
      setInputValue('')
    }
  }

  return (
    <div className={styles.student}>
      <div className={styles.imageWrap}>
        <img className={styles.img} src={pic} alt={'user avatar'}/>
      </div>
      <div className={styles.data}>
        <header className={styles.header}>{firstName} {lastName}</header>
        <main className={styles.main}>
          <span>Email: {email}</span>
          <span>Company: {company}</span>
          <span>Skill: {skill}</span>
          <span>Average: {average} %</span>
          {<ul className={classname(styles.list, { [styles.listVisible]: isOpenGrades })}>
            {grades.map((grade, i) => <li key={i}>Taste {i + 1}: {grade} %</li>)}
          </ul>}
        </main>
        <footer className={styles.footer}>
          {tags && <ul className={styles.tags}>
            {tags.map(tag => <li key={tag} className={styles.tag}>{tag}</li>)}
          </ul>}
          <input value={inputValue} className={styles.input} type={'text'} onChange={onChange} onKeyPress={onKeyPress}
                 placeholder={'Add a tag'}/>
        </footer>
      </div>
      <div className={styles.expand}>
        <button className={classname(styles.button, { [styles.buttonClicked]: isOpenGrades })} onClick={onClick}/>
      </div>
    </div>
  )
}

export default Student