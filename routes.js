'use strict';
const user = require('./app/controller/user.ctrl');
const videos = require('./app/controller/videos.ctrl');
const category = require('./app/controller/category.ctrl');
const favorites = require('./app/controller/favorites.ctrl');
const notification = require('./app/controller/notification.ctrl');
const ticket = require("./app/controller/ticket.ctrl");
const { authJwt } = require("./app/middlewares");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.route("/")
        .get((req, res) => {
            res.json({ message: 'Welcome to Reviews Apps' });
        }
        );

    // Function for Mobile
    app.get('/user/listVideosByCategory', [authJwt.isUser], videos.listVideosByCategory);
    app.get('/user/listMerchant', [authJwt.isUser], user.listMerchantPaging);
    app.get('/user/listVideosByMerchant', [authJwt.isUser], videos.listVideosByMerchant);
    app.get('/user/getFavourites', [authJwt.isUser], favorites.getFav);
    app.get('/user/getNotification', [authJwt.isUser], notification.getNotification);
    app.get('/user/home', [authJwt.isUser], videos.getVideos);
    app.get('/user/getProfile', [authJwt.isUser], user.getProfile);
    app.get('/user/category', [authJwt.isUser], category.getAllRecord);
    app.post('/user/login', user.loginUser);
    app.post('/user/loginSSO', user.loginUserSSO);
    app.post('/user/register', user.registerUser);
    app.post('/user/registerMerchant', [authJwt.isUser], user.registerMerchant);
    app.post('/user/merchantPage', [authJwt.isUser], user.merchantPage);
    app.post('/user/videosPage', [authJwt.isUser], videos.videosPage);
    app.post('/user/actionFav', [authJwt.isUser], favorites.actionFav);
    app.post('/user/submitProfile', [authJwt.isUser], user.submitProfile);
    app.post('/user/changePassword', [authJwt.isUser], user.changePassword);
    app.post('/user/listVideos', [authJwt.isUser], videos.listVideos);
    app.post('/user/forgotPassword', user.forgotPasswordReq);
    app.post('/user/updateNotifReadAll', [authJwt.isUser], notification.notifReadAll);
    app.post('/user/updateNotifMute', [authJwt.isUser], user.updateMute);

    app.post('/user/actionVidComments', [authJwt.isUser], videos.actionVidComments);
    // Function for Web
    app.post('/user/resetPassword', [authJwt.isResetPassword], user.resetPassword);
    // Merchant
    app.get('/merchant/listTicket', [authJwt.isMerchant], ticket.listTicketMerchant);
    app.get('/merchant/listMessage', [authJwt.isMerchant], ticket.listMessageByTicket);
    app.get('/merchant/listVideosHistory', [authJwt.isMerchant], videos.listVideosHistoryMerchant);
    app.get('/merchant/getDashboard', [authJwt.isMerchant], videos.getDashboard);
    app.get('/merchant/getVideosDetail', [authJwt.isMerchant], videos.getVideosDetail);
    app.get('/merchant/getProfile', [authJwt.isMerchant], user.getMerchantProfile);
    app.post('/merchant/login', user.loginMerchant);
    app.post('/merchant/loginSSO', user.logiMerchantSSO);
    app.post('/merchant/submitLivestream', [authJwt.isMerchant], videos.submitLivestream);
    app.post('/merchant/submitProfile', [authJwt.isMerchant], user.submitMerchantProfile);
    app.post('/merchant/createTicket', [authJwt.isMerchant], ticket.createTicket);
    app.post('/merchant/insertMessageTicket', [authJwt.isMerchant], ticket.insertMessage);
    // Admin
    app.post('/admin/login', user.loginAdmin);
    app.get('/admin/listTicket', [authJwt.isAdmin], ticket.listTicketAdmin);
    app.post('/admin/insertMessageTicket', [authJwt.isAdmin], ticket.insertMessage);
    app.get('/admin/listMessage', [authJwt.isAdmin], ticket.listMessageByTicket);
    app.get('/admin/userList', [authJwt.isAdmin], user.getListUser);
    app.get('/admin/merchantList', [authJwt.isAdmin], user.getListMerchant);

    app.get('/tes_jwt', [authJwt.isUser], function (req, res) {
        res.json({ message: 'Berhasil tes token' });
    });

    app.post("/tesf", function (req, res) {
        console.log(req.headers);
        console.log(req.body);
        return res.json({
            sts: "ok"
        });
    });
};