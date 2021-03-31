
import { useDataEngine } from '@dhis2/app-runtime'
import { PropTypes } from '@dhis2/prop-types'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchEbolaData } from '../redux/actions/chain'
import Graph from "react-graph-vis"
import "./network.css";
import { CircularLoader } from "@dhis2/ui-core";

const EbolaChain = ({ fetchEbolaData, data, loading }) => {
    const engine = useDataEngine()

    useEffect(() => {
        fetchEbolaData(engine);
    }, []);


    const hierarchicalOptions = {
        height: '100%',
        width: '100%',
        nodes: {
            size: 16
        },
        interaction: {
            dragNodes: true,
            hover: true,
            zoomView: true,
            navigationButtons: true
        },
        layout: {
            randomSeed: 1,
            improvedLayout: true,
            hierarchical: {
                enabled: true,
                direction: 'UD',
                sortMethod: 'directed',
                parentCentralization: true
            }
        }

    }

    const nonHierarchicalOptions = {
        height: '100%',
        width: '100%',
        nodes: {
            size: 16
        },
        interaction: {
            dragNodes: true,
            hover: true
        },
        layout: {
            randomSeed: 1,
            improvedLayout: true,
            hierarchical: {
                enabled: false,
                direction: 'UD',
                sortMethod: 'directed',
                parentCentralization: true
            }
        }

    }


    const [options, setOptions] = useState(nonHierarchicalOptions);

    const handleChange = (e) => {
        if (e.target.checked) {
            setOptions(hierarchicalOptions);
        } else {
            setOptions(nonHierarchicalOptions);
        }
    }
    return !loading ?
        <div className="">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-sm-6">
                            <ul>
                                <li id="legend-probable">Cas probable</li>
                                <li id="legend-confirme">Cas confirmé</li>
                            </ul>
                        </div>
                        <div className="col-sm-6">
                            <label>
                                <input
                                    type="checkbox"
                                    defaultChecked={false}
                                    onChange={handleChange}

                                /> Affichage hierarchique
                            </label>
                        </div>
                    </div>


                </div>

                <div className="card-body">
                    <Graph graph={data.graph} options={options} style={{ height: "100vh", width: "100%" }} />
                </div>
            </div> </div>

        :

        <div className="centered-loader">
            <CircularLoader />
            <span>Loading ....</span>
        </div>







}

EbolaChain.propTypes = {
    fetchEbolaData: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    data: state.chain.data,
    loading: state.chain.loading
})
export default connect(mapStateToProps, { fetchEbolaData })(EbolaChain)
