// const { sendErrorResponse, sendSuccessResponse } = require('./response')

// const url = 'https://newsapi.org/v2/top-headlines?' +
//           'country=us&' +
//           'apiKey=c436a32b070b4e6ea259bb4ac3a1b81d';

// var req = new Request(url);
// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     })

//     const index = (req, res) => {
//         db.Post.find({}).populate('user').exec((error, foundAllPost) => {
//             if (error) return sendErrorResponse(res, error);
//             sendSuccessResponse(res, foundAllPost);
//         });
//     };
    

// const index = (req, res) => {
//     googleTrends.dailyTrends({ geo: 'US', }, (error, results) => {
//         if (error) return sendErrorResponse(res, error);
//         sendSuccessResponse(res, results);
//       });
// };

// module.exports = {
//     index,
// };



// c436a32b070b4e6ea259bb4ac3a1b81d