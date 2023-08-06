const isLogin = async (req, res, next) => {
    console.log("Done");

    try {
      if (req.session.admin) {
        next();
      } else {
        return res.redirect("/auth")
      }
    } catch (error) {
      console.log(error);
    }
  }
    
    const isLogout = async (req,res,next)=>{
        console.log("Done 2")

      try {
        if(!req.session.admin ){
          next();
        }
        else{
          return res.redirect("/admin")
        }
        next();
      } catch (error) {
        console.log(error)
      }
    }
  
  
  
   
    module.exports = {
      isLogin,
      isLogout
    }  