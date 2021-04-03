import { FETCHING_EBOLA_POSITIVE, RECEIVED_EBOLA_POSITIVE } from "../types";


/* const query = {
    results: {
        resource: 'indicators',
        params: {
            oder: 'name:desc',
            fields: 'name,description,uid',
            pageSize: 5
        }
    },
} */

//analytics.json?dimension = dx : KoLdn8Sl9O2; WLhdxz4jl8B; rQKBpHTBl1y; rUVXXCXnd51 & 
//dimension=pe: THIS_YEAR & filter=ou: Ky2CzFdfBuO & skipData=false & skipMeta=true



/* const query = {
    results: {
        resource: 'analytics',
        params: {
            dimension: [
                'dx:KoLdn8Sl9O2;WLhdxz4jl8B;rQKBpHTBl1y;rUVXXCXnd51',
                'pe:THIS_YEAR'
            ],
            filter: 'ou:Ky2CzFdfBuO',
            outputType: 'ENROLLMENT',
            skipData: false,
            skipMeta: true
        }
    },
} */

const query = {
    result: {
        resource: 'analytics/enrollments/query/ax5HUr47haJ',
        params: {
            dimension: [
                'ou:Ky2CzFdfBuO',
                'eX8qUeVEgr0.PyfoM5RZKvT',
                'eX8qUeVEgr0.bbOBxG4F6ja',
                'eX8qUeVEgr0.bXEwbxbLR9a',
                'eX8qUeVEgr0.Mj4c07bIa9v',
                'eX8qUeVEgr0.m3nu3nS6GV9:IN:Probable;Confirme par laboratoire',
                'eX8qUeVEgr0.rkQEv1WFZ1u',
                'f3OsLh60IS1.tmwSoQ3hCsb',
                'f3OsLh60IS1.KedfjhucNJe',
                'pe:THIS_YEAR'
            ],
            displayProperty: 'SHORTNAME',
            stage: 'eX8qUeVEgr0',
            filter: 'ou:Ky2CzFdfBuO',
            outputType: 'ENROLLMENT',
            skipData: false,
            skipMeta: true,
            pageSize: 200,
            page: 1
        }
    },
}

const relationship = (tei) => {
    return {
        relationships: {
            resource: 'relationships',
            params: {
                tei: `${tei}`,
                fields: 'from'
            }

        }
    }
}

export const fetchEbolaData = (engine) => async dispatch => {

    dispatch({
        type: FETCHING_EBOLA_POSITIVE,
    });

    const { result } = await engine.query(query);


    const positifs = result.rows;
    const nodesData = [];
    const edgeData = [];
    for (let index = 0; index < positifs.length; index++) {
        const element = positifs[index];
        const icon = {
            face: 'FontAwesome',
            code: element[13].toUpperCase() === 'MASCULIN' ? '\uf183' : '\uf182',
            size: 30,
            color: element[14] === 'Probable' ? '#e8ac09' : '#f2103a'
        }
        nodesData.push({
            id: element[1],
            label: `${element[11].substring(0, 1).toUpperCase()}${element[12].substring(0, 1).toUpperCase()}`,
            title: `ID : ${element[10].toUpperCase()}\nNOM : ${element[11].toUpperCase()} ${element[12].toUpperCase()}`,
            contacts: 0,
            cds: 0,
            positifs: 0,
            classification: element[14],
            lien: element[16],
            suivi: element[17],
            shape: 'icon', icon: icon
        });
    }


    for (let index = 0; index < nodesData.length; index++) {
        const element = nodesData[index];
        //const res = await dhis2.get(`/33/relationships.json?tei=${element.id}`);
        const { relationships } = await engine.query(relationship(element.id));
        // const relationships = res.data;

        if (relationships) { //.httpStatusCode

            const indexToUpdate = nodesData.findIndex(n => n.id === element.id);
            nodesData[indexToUpdate].contacts = relationships.length;
            // nodesData[indexToUpdate].title = `${nodesData[indexToUpdate].title} \n ${relationships.length} Contact(s)`;


            let cds = 0;
            relationships.forEach((currentRelationship) => {
                const categorie = currentRelationship.to.trackedEntityInstance.attributes.filter(item => item.attribute === 'OHK2Nw3Bx6P');

                cds += categorie && categorie.length > 0 && categorie[0].value === "Contact devenu suspect" ? 1 : 0;



                let founds = nodesData.filter((node) => node.id === currentRelationship.to.trackedEntityInstance.trackedEntityInstance);

                if (founds && founds.length > 0 && element.id !== currentRelationship.to.trackedEntityInstance.trackedEntityInstance) {
                    nodesData[indexToUpdate].positifs += 1;
                    edgeData.push({
                        from: element.id,
                        to: currentRelationship.to.trackedEntityInstance.trackedEntityInstance,
                        width: 1.5
                    }
                    );
                }
                // mise en oeuvre des liens source -> destination : source = element et destination = currentRelationship
                const indexEdgeToUpdate = edgeData.findIndex(edge => edge.from === element.id && edge.to === currentRelationship.to.trackedEntityInstance.trackedEntityInstance);
                const indexNodeToGetData = nodesData.findIndex(n => n.id === currentRelationship.to.trackedEntityInstance.trackedEntityInstance);

                if (indexEdgeToUpdate !== -1 && indexNodeToGetData !== -1) {
                    edgeData[indexEdgeToUpdate].label = nodesData[indexNodeToGetData].lien;
                    edgeData[indexEdgeToUpdate].color = nodesData[indexNodeToGetData].suivi === 'Non' ? 'blue' : (nodesData[indexNodeToGetData].suivi === 'Oui' ? 'green' : '#000000'); //'#e8ac09' : '#f2103a'

                }

            })
            nodesData[indexToUpdate].cds = cds;
            nodesData[indexToUpdate].title = `${nodesData[indexToUpdate].title}\nCONTACTS : ${relationships.length}\nSUSPECTS : ${nodesData[indexToUpdate].cds}\nPOSITIFS : ${nodesData[indexToUpdate].positifs}`;

        }
    }

    dispatch({
        type: RECEIVED_EBOLA_POSITIVE,
        payload: {
            counter: 100,
            graph: {
                nodes: nodesData,
                edges: edgeData
            }

        }
    });

}