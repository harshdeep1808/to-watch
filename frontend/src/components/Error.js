import {Alert} from 'react-bootstrap'

export default Error=(props)=>{
    return (
        <Alert variant="danger">
             {props.message}
        </Alert>
    )
}