import { disconnect } from "./mongo"

const getError = (err:any) =>{
    return err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message
}

const onError =async(err:any,req:any,res:any, next:any) =>{
    await disconnect()
    res.status(500).send({message: err.toString()})
}
export {getError, onError}