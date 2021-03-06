import PropTypes from 'prop-types'
import Button from './Button'
const Header = ({title,onAdd}) => {
    const onClick = () => {
        console.log('click')
    }
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color="green" text="Add" onClick={onAdd}/>
        </header>
    )
}
Header.defaultProps = {
    title:'Task Manager'
}
Header.propTypes = {
    title: PropTypes.string.isRequired
}
export default Header
