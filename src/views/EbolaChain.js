
import { useDataEngine } from '@dhis2/app-runtime'
import { PropTypes } from '@dhis2/prop-types'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchEbolaData } from '../redux/actions/chain'
import Graph from "react-graph-vis"
import "./network.css";
import { CircularLoader, Button } from "@dhis2/ui-core";
import canvasToImage from 'canvas-to-image'
import { Legend } from './Legend'

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
    const download = () => {
        var canvas = document.getElementsByTagName("canvas")[0];
        canvasToImage(canvas, {
            name: 'chain_de_transmission',
            type: 'png',
            quality: 1
        })
    }
    return data ?
        <div className="">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-sm-8">
                            <label>
                                <input
                                    type="checkbox"
                                    defaultChecked={false}
                                    onChange={handleChange}

                                /> Affichage hierarchique
                            </label>
                        </div>
                        <div className="col-sm-4">
                            <Button onClick={() => download()} primary className="float-right">Télécharger</Button>
                        </div>
                    </div>


                </div>

                <div className="card-body">
                    <Legend data={data.graph} />
                    <Graph id="chain" graph={data.graph} options={options} style={{ height: "670px", width: "100%" }} />
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
