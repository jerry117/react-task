
import {FaTimes} from 'react-icons/fa'

export const Task = ({task}) => {
  return (
    <div className="task">
        <h3>{task.text}  <FaTimes style={{color: 'red', cursor:'pointer'}}/></h3>
        <p>{task.days}</p>
    </div>
  )
}
