const {blogListModel} = require("../models/Blog_list_model")
const basepath = process.env.BASE_PATH;

module.exports.handleGetData = async (req,res)=> {
    try {
        const blogList = await blogListModel.find({})
        return res.status(200).send(blogList[0])
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}

module.exports.handleCreatedata = async (req,res)=>{
    try {
        const body = req.body
        if(body.blogList){
            await blogListModel.create({
                blogs : body.blogList.blogs,
                Categories :body.blogList.Categories,
                RecentPosts1 : body.blogList.RecentPosts1,
                RecentPosts2 : body.blogList.RecentPosts2,
                PopularTags : body.blogList.PopularTags,
                box : body.blogList.box
            })
        }
        if(req.files){
            if(body.blogId && body.blogListId){
                const data = await blogListModel.findById(body.blogListId)
                    let blog = data.blogs
                    let blg = blog.filter((ob)=>(
                        ob._id == body.blogId
                    ))
                    blg[0].image = `${basepath}/uploads/${req.files[0].filename}`
                    blog = blog.map((obj)=>(
                        obj._id==body.blogId ? blg[0] : obj
                    ))
                    await blogListModel.findByIdAndUpdate(body.blogListId,{blogs : blog})
            }
            if(body.recentPosts1Id && body.blogListId){
                const data = await blogListModel.findById(body.blogListId)
                let recPost = data.RecentPosts1
                let rcp = recPost.filter((obj)=>(
                    obj._id == body.recentPosts1Id
                ))
                rcp[0].image = `${basepath}/uploads/${req.files[0].filename}`
                recPost = recPost.map((obj)=>(
                    obj._id == body.recentPosts1Id ? rcp[0] : obj
                ))
                await blogListModel.findByIdAndUpdate(body.blogListId,{RecentPosts1 : recPost})
            }
            if(body.recentPosts2Id && body.blogListId){
                const data = await blogListModel.findById(body.blogListId)
                let recPost = data.RecentPosts2
                let rcp = recPost.filter((obj)=>(
                    obj._id == body.recentPosts2Id
                ))
                rcp[0].image = `${basepath}/uploads/${req.files[0].filename}`
                recPost = recPost.map((obj)=>(
                    obj._id == body.recentPosts2Id ? rcp[0] : obj
                ))
                await blogListModel.findByIdAndUpdate(body.blogListId,{RecentPosts2 : recPost})
            }
            if(body.boxImageId){
                const data = await blogListModel.findById(body.boxImageId)
                const bx = data.box
                bx.companyLogoImage = `${basepath}/uploads/${req.files[0].filename}`
                await blogListModel.findByIdAndUpdate(body.boxImageId,{box : bx})
            }
        }

        res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}

module.exports.handleDeleteData = async(req,res)=>{
    try {
        const body = req.body
        if(body.blogList){
            if(body.blogList.blogListId && body.blogList.blogId){
                const data = await blogListModel.findById(body.blogList.blogListId)
                let blog = data.blogs
                blog = blog.filter((obj)=>(
                    obj._id !=  body.blogList.blogId
                ))
                await blogListModel.findByIdAndUpdate(body.blogList.blogListId,{blogs : blog})
            }
            else if( body.blogList.blogListId && body.blogList.RecentPosts1Id){
                const data = await blogListModel.findById(body.blogList.blogListId)
                let posts = data.RecentPosts1
                posts = posts.filter((obj)=>(
                    obj._id != body.blogList.RecentPosts1Id
                ))
                await blogListModel.findByIdAndUpdate(body.blogList.RecentPosts1Id,{RecentPosts1 : posts})
            }
            else if(body.blogList.blogListId && body.blogList.RecentPosts2Id){
                const data = await blogListModel.findById(body.blogList.blogListId)
                let posts = data.RecentPosts2
                posts = posts.filter((obj)=>(
                    obj._id != body.blogList.RecentPosts2Id
                ))
                await blogListModel.findByIdAndUpdate(body.blogList.RecentPosts1Id,{RecentPosts2 : posts})
            }
            else if(body.blogList.blogListId && body.blogList.PopularTagsId){
                const data = await blogListModel.findById(body.blogList.blogListId)
                let posts = data.PopularTags
                posts = posts.filter((obj)=>(
                    obj._id != body.blogList.PopularTagsId
                ))
                await blogListModel.findByIdAndUpdate(body.blogList.RecentPosts1Id,{PopularTags : posts})
            }
            else if(body.blogList.categories){
                const data = await blogListModel.findById(body.blogList.blogListId)
                let posts = data.Categories
                posts = posts.filter((str)=>(
                    str != body.blogList.categories
                ))
                await blogListModel.findByIdAndUpdate(body.blogList.RecentPosts1Id,{Categories : posts})
            }
        }

        if(body.blogListId){
            await blogListModel.findByIdAndDelete(body.blogListId)
        }

        res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}