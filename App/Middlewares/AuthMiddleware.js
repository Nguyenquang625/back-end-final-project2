const jwt = require('jsonwebtoken');

class AuthMiddleware{
    constructor(){
        
    }
    /*
    *description: middleware check authentication
    */
    auth({req,res,next}){
        const {headers} = req;
        const token = headers.authorization;

        //check token exist.
        if(!token){
            return next({
                message:'token_required',
                data: null
            });
        }

        const dataToken = jwt.verify(token,Env.APP_KEY);
      
        console.log('verify thanh cong');
        req.user = dataToken;
        next();
    }

    //Su dung vi nhung API login hoac k log in van xai dc
    noAuth(){

    }
}

module.exports = new AuthMiddleware();