exports.getsignupPage = (request, response, next) => {
    response.sendFile('usersignup.html', { root: 'views' });
}
exports.getloginPage = (request, response, next) => {
    response.sendFile('userlogin.html', { root: 'views' });
}
exports.getchat = (request, response, next) => {
    response.sendFile('chat2.html', { root: 'views' });
}
exports.creategroup = (request, response, next) => {
  response.sendFile("creategroup.html", { root: "views" });
};
/*exports.getforgotpassword = (request, response, next) => {
    response.sendFile('forgotpassword.html', { root: 'views' });
}*/