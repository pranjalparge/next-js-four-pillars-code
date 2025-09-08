import {handleGetData} from "src/controllers/4pii_newHomepageHandler"
import connect from "src/lib/db";


export async function GET (req:Request) : Promise<Response>{
    await connect()
    try {
        const data = await handleGetData()
        return Response.json({homePageContent : data.homePageContent},{
            status : 200,
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            Message : "error for getting hompage data",
            error
        },
    {
        status : 500
    })
    }
}

export async function PATCH(req:Request){
    try {
        
    } catch (error) {
        console.log(error)
    }
}
