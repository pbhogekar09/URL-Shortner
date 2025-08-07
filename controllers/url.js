const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res){
        const body = req.body;
        console.log("FORM BODY:", req.body); 

        if (!body.url) {
            console.log("Missing URL input");
            return res.status(400).json({ msg: "url is required" });
        }
        
        const shortID = shortid();
        await URL.create({
            shortId:shortID,
            redirectURL : body.url,
            visitHistory:[],
            createdBy: req.user._id // Assuming req.user is set by the auth middleware
        });
    return res.render("home", {
        id : shortID
    });
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    });
}

/* async function handleGetDelete(req,res){
    const shortId = req.params.shortId;
    await URL.findOneAndDelete({shortId});
    return res.json({
        status : "record deleted"
    });
} */

module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
   
};