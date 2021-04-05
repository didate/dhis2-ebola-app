import './legend.css'


export const Legend = ({ data }) => {

    const countConfirme = data.nodes.filter(item => item.classification === "Confirme par laboratoire").length
    const countProbable = data.nodes.filter(item => item.classification === "Probable").length

    return (
        <div className="legend visualization-overlay">

            <div className="leg-item">
                <div className="leg-item-arrow" style={{ color: 'blue' }}>
                    &rarr;
                </div>
                <div className="leg-item-text">
                    Non suivis
                </div>
            </div>

            <div className="leg-item">
                <div className="leg-item-arrow" style={{ color: 'green' }}>
                    &rarr;
                </div>
                <div className="leg-item-text">
                    Suivis
                </div>
            </div>

            <div className="leg-item">
                <div className="leg-item-arrow" style={{ color: 'black' }}>
                    &rarr;
                </div>
                <div className="leg-item-text">
                    Inconnus
                </div>
            </div>


            <div className="leg-item">
                <div className="leg-item-symbol">
                    <div className="leg-item-symbol-circle symbol-border" style={{ backgroundColor: '#f2103a' }}>
                    </div>
                </div>
                <div className="leg-item-text">
                    Confirmés ({countConfirme})
                </div>
            </div>

            <div className="leg-item">
                <div className="leg-item-symbol">
                    <div className="leg-item-symbol-circle symbol-border" style={{ backgroundColor: '#e8ac09' }}>
                    </div>
                </div>
                <div className="leg-item-text">
                    Probables ({countProbable})
                </div>
            </div>
        </div>
    )

}