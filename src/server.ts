import express,{Request,Response,NextFunction, json} from 'express'
import 'express-async-errors'
import cors from 'cors'
import { router } from './routes';
import path from 'path'
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname,'..','tmp'))
)

app.use((err:Error,req:Request,res:Response, next:NextFunction)=> {
// se for do tipo erro ele leva pro status 400 se nao ele leva pro iternal server

    if( err instanceof Error){
    return res.status(400).json({
        error:err.message
    })
}
return res.status(500).json({
    status:'error',
    message:'Internal server error'
})


})

app.listen(3333,()=> console.log('Servidor online'))