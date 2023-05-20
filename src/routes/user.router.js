import { Router } from "express";
import UserManager from "../dao/userManager.js";
import { hashData, compareData } from "../utils.js";
import passport from "passport";

const router = Router();
const userManager = new UserManager();

const users = [{ email: "adminCoder@coder.com", password: "adminCod3r123" }];

/*router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      req.session["email"] = email;
      req.session["isAdmin"] = true;
      res.redirect("/products");
    } else {
      const user = await userManager.getUser( {email});
      
      if (!user) {
        return res
          .status(401)
          .send("Usuario no existe o contraseña incorrecta");
      }
      //Me quedo solo con el valor del password que vino en el array user
      const passwordDB = user[0].password
      const isPasswordValid = await compareData(password, passwordDB);
     
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña inválida" });
      }
      req.session["email"] = email;
      req.session["logged"] = true;
      req.session["isAdmin"] = false;
      res.redirect("/products");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
}); */

router.post ("/", passport.authenticate('login'), async (req, res)=>{
  res.redirect('/products')
})


/*
router.post("/register", async (req, res) => {
  const user = req.body;
  const hashPassword = await hashData(user.password);
  const newUser = userManager.addUser({ ...user, password: hashPassword });
  res.redirect("/");
  return newUser;
});*/

router.post ("/register", passport.authenticate('signup'), async (req, res)=>{
  res.redirect ('/')
})

router.get("/logout", passport.authenticate('signup', {successRedirect:'/products'}))

router.get ('/signUpGitHub', passport.authenticate ('github', { scope: [ 'user:email' ] }))
router.get ('/github', passport.authenticate ('github'), (req, res)=>{
  res.send ('Usuario creado con la estrategia de GitHub')
})


export default router;
