import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import versionService from "../../../services/versionService";

const VersionPane = () => {
    const [showUpdate, setShowUpate] = useState(false);
    const [inputVersion, setInputVersion] = useState("");

    const [updateField, setUpdateField] = useState("");
    const [repair, setRepair] = useState("");


    const [previousVersion, setPreviousVersion] = useState([
    ])

    const [currentVersion, setCurrentVersion] = useState({});


    const fetchAll = () => {
        versionService.showAll().then(({ data }) => {
            const versions = [...data];
            const lastVersion = versions.pop();
            const previousVersionS = data.map((el, index) => {
                if (index >= data.length - 1) return null;
                return el;
            }).filter((el) => el !== null);
            setPreviousVersion(previousVersionS);
            setCurrentVersion(lastVersion);
        })
    }

    useEffect(() => {
        fetchAll()
    }, []);

    const saveNewVersion = () => {
        const newVersion = {
            version: inputVersion,
            updateField,
            repair,
            updateTimestamp: new Date()
        }
        versionService.create(newVersion).then(({ data }) => {
            alert(JSON.stringify(data))
            fetchAll()
            setShowUpate(false)
        })
    }

    if (showUpdate) {
        return <>

            <div>
                <span>
                    <label>
                        <h3>Update - Version</h3>
                    </label>
                    <input onInput={(e) => setInputVersion(e.target.value)} value={inputVersion}></input>
                </span>
            </div>

            <p>
                Discribtion:
            </p>
            <div>    <label>Update</label>
                <textarea onInput={(e)=>setUpdateField(e.target.value)} value={updateField}>

                </textarea>

                <label>Repair</label>
                <textarea onInput={(e)=>setRepair(e.target.value)} value={repair}>

                </textarea></div>
            <div>
                <Button onClick={saveNewVersion}>Save</Button>
            </div>
        </>
    }
    return <>
        <Grid container>
            <Grid item><h1>Version Pane</h1></Grid>
            <Grid item><Button onClick={() => setShowUpate(true)}>Update</Button></Grid>
        </Grid>

        <div>
            <h3>Current version:</h3>
            <div>
                <h4>- {currentVersion.version}</h4>
                <p>Update: {currentVersion.updateField}</p>
                <p>Repair: {currentVersion.repair}</p>
            </div>
        </div>

        <div>
            <h3>Previous version:</h3>
            {previousVersion.map((el, index) => {
                return (<div key={"p_v_" + index}>
                    <h4>- {el.version}</h4>
                    <p>Update: {el.updateField}</p>
                    <p>Repair: {el.repair}</p>
                </div>)
            })}
            {/* <p>
                <h4>- 17.0</h4>
                <p>Update: This update allows you to XXXXXX</p>
                <p>Repair: -XXXXXXXXX</p>
            </p>

            <p>
                <h4>- 16.9</h4>
                <p>Update: This update allows you to XXXXXX</p>
                <p>Repair: -XXXXXXXXX</p>
            </p> */}
        </div>
    </>
}

export default VersionPane;