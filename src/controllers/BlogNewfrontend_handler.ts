const {blogNewfrontendModel} = require("../models/Blog_Newfrontend")
const basepath = process.env.BASE_PATH;


module.exports.handleGetData = async(req,res)=>{
    try {
        
        const blog = await blogNewfrontendModel.find({})
        res.send(blog)

    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}

module.exports.handleCreateData = async(req,res)=>{
    try {
        
        const body = req.body
        if(!body){
            return res.status(400).send("no data")
        }
        if(body.blog){
            const blg = await blogNewfrontendModel.create({
                firstObject : body.blog.firstObject,
                noOfBlogs : body.blog.noOfBlogs,
                blogs : body.blog.blogs
            })
            blg.noOfBlogs.no = blg.blogs.length
            await blogNewfrontendModel.findByIdAndUpdate(blg._id,{noOfBlogs :  blg.noOfBlogs})
        }

        res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}