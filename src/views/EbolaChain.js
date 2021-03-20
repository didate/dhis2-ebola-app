
import { PropTypes } from '@dhis2/prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchEbolaData } from '../redux/actions/chain'

const EbolaChain = ({ fetchEbolaData, data }) => {
    useEffect(() => {
        fetchEbolaData();
    }, []);

    return <div>{data ? data.message : <div>Loading</div>}</div>

}

EbolaChain.propTypes = {
    fetchEbolaData: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    data: state.chain.data
})
export default connect(mapStateToProps, { fetchEbolaData })(EbolaChain)
