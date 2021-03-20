import { PropTypes } from '@dhis2/prop-types'
import { MenuItem, Menu } from '@dhis2/ui'
import { useHistory, useRouteMatch } from 'react-router-dom'

const NavigationItem = ({ path, label }) => {

    const history = useHistory()
    const routeMatch = useRouteMatch(path)
    const isActive = routeMatch?.isExact
    const onClick = () => !isActive && history.push(path)
    return <MenuItem label={label} active={isActive} onClick={onClick} />
}

NavigationItem.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired

}

export const Navigation = () => (
    <Menu>
        <NavigationItem label="Dashboard" path="/" />
        <NavigationItem label="Chain" path="/ebola-chain" />
    </Menu>
)