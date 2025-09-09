
import connect from "src/lib/db";
import {handleGetData} from "src/controllers/4pii_newHomepageHandler"
import { DemoImageModel } from "src/lib/modals/4pii_NewHompageContent";
import fs from "fs"
import path from "path";

const uploadDir = path.join(process.cwd(),"public","upload")

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


export async function POST(req : Request){
    await connect()
    try {
        // Ensure folder exists
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir,{recursive :true})
        }

        const reqFile = await req.formData()
        const file = reqFile.get("file") as File

        if (!file) {
            return Response.json({ error: "No file uploaded" }, { status: 400 });
        }

        const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
        if(!allowedTypes.includes(file.type)){
            return Response.json({
                success : false,
                message : "Doesn't support this type"
            },{
                status : 400
            })
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const maxSize = 5*1024*1024

        if(buffer.length>maxSize){
            return Response.json({
                success : false,
                message : "Maxsize is 5 mb"
            },{
                status : 400
            })
        }

        const fileName = `${Date.now()}-${file.name}`
        const filePath = path.join(uploadDir,fileName)

        await fs.promises.writeFile(filePath,buffer)

        await DemoImageModel.create({
            image : `upload/${fileName}`
        })

        return Response.json({
            success : true,
            message : "Image is saved",
            path : `upload/${fileName}`
        },{
            status : 200
        })

    } catch (error:any) {
        console.error(error)
        return Response.json({
            success : false,
            error : error.message
        },{
            status : 500
        })
    }
}
