const express = require("express");
const app = express();
const port = 3001;

// import sequilize
const { Sequelize, Op, Model, DataTypes, QueryTypes } = require("sequelize");
const developmentConfig = require("/Users/yahya/OneDrive/Desktop/test html/coding/Task 14/assets/config/connection.json").connection;

// import bycrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

// import session
const cookieSession = require("cookie-session");
const session = require("express-session");
app.set("trust proxy", 1); // trust first proxy

//import flash
const flash = require("express-flash");
// create instance sequilize connection
const sequelizeConfig = new Sequelize("task-13", "postgres", "Yahyaagung17", {
  host: "localhost",
  dialect: "postgres",
});

// import multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/Users/yahya/OneDrive/Desktop/test html/coding/Task 14/assets/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage: storage });
// support view handlebars
app.set("view engine", "hbs");
app.set("views", "views");

// static file
app.use("/assets", express.static("assets"));
app.use("/assets/uploads", express.static("assets/uploads"));

//body parser
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
  session({
    secret: "wadidaww",
    store: new session.MemoryStore(),
    cookie: {
      maxAge: 3000 * 60,
      httpOnly: true,
      secure: false,
    },
    saveUninitialized: true,
    resave: false,
  })
);

function getDurationDate(dateContentStart, dateContentEnd) {
  let distanceDuration = dateContentEnd - dateContentStart;

  let yearMonth = 12;
  let monthWeek = 4;
  let weekDay = 7;
  let dayHour = 24;
  let hourMinute = 60;
  let minuteSecond = 60;
  let secondMilisecond = 1000;

  let oneYear = yearMonth * monthWeek * weekDay * dayHour * hourMinute * minuteSecond * secondMilisecond;
  let oneMonth = monthWeek * weekDay * dayHour * hourMinute * minuteSecond * secondMilisecond;
  let oneWeek = weekDay * dayHour * hourMinute * minuteSecond * secondMilisecond;
  let oneDay = dayHour * hourMinute * minuteSecond * secondMilisecond;

  let durationYear = Math.floor(distanceDuration / oneYear);
  let durationMonth = Math.floor(distanceDuration / oneMonth);
  let durationWeek = Math.floor(distanceDuration / oneWeek);
  let durationDay = Math.floor(distanceDuration / oneDay);

  if (durationDay < 7) {
    return `${durationDay} hari`;
  } else if (durationWeek <= 4) {
    return `${durationWeek} minggu`;
  } else if (durationMonth <= 12) {
    return `${durationMonth} bulan`;
  } else {
    return `${durationYear} tahun`;
  }
}

//rooting
app.get("/contact-page", contact);
app.get("/project-page", projectAdd);
app.get("/detail-project/:id", projectDetail);
app.get("/home", homePage);
app.post("/project-page", upload.single("image"), addProject);
app.get("/login", loginPage);
app.get("/register", registerPage);
app.get("/logout", logout);

// add data from register and login
app.post("/register", register);
app.post("/login", login);

// button edit and delete
app.get("/delete-project/:id", deleteProject);
app.get("/edit-project/:id");
app.post("/edit-project/:id");
app.get("/edit-project/:id", editProject);

async function homePage(req, res) {
  try {
    console.log("===========================================================");
    const { title, startDate, endDate, description } = req.body;
    // const duration = getDurationDate(new Date(startDate), new Date(endDate));
    // console.log(duration);

    const QueryName = 'SELECT b.id, b.title, b.start_date, b.end_date, b.image, b.description, u.name AS author FROM tb_projects b INNER JOIN "users" u ON b.author = u.id ORDER BY id DESC';
    const tb_projects = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT });
    // data dimasukkan kesini
    const obj = tb_projects.map((data) => {
      return {
        ...data,
        isLogin: req.session.isLogin,
      };
    });
    //
    res.render("home-page", { data: obj });
  } catch (error) {
    console.log(error);
  }
}

function registerPage(req, res) {
  res.render("register");
}

function contact(req, res) {
  res.render("contact-page");
}

function projectAdd(req, res) {
  res.render("project-page");
}

async function projectDetail(req, res) {
  try {
    const id = req.params.id;
    const QueryName = `SELECT * FROM tb_projects WHERE id=${id}`;
    const tb_projects = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT });

    const obj = tb_projects.map((data) => {
      return {
        ...data,
        author: "Meeeee",
      };
    });
    console.log(obj);

    res.render("detail-project", { data: obj[0] });
  } catch (error) {
    console.log(error);
  }
}

async function addProject(req, res) {
  try {
    const { title, startDate, endDate, description } = req.body;
    console.log("================================");

    const author = req.session.idUser;
    const image = req.file.filename;

    const QueryName = `
    INSERT INTO tb_projects(
       title, start_date, end_date, description, author, image, "createdAt", "updatedAt")
      VALUES ( '${title}', '${startDate}', '${endDate}', '${description}', '${author}', '${image}', NOW(), NOW());`;

    const result = await sequelizeConfig.query(QueryName);
    console.log(result);

    res.redirect("/home");
  } catch (error) {
    console.error("Error adding project:", error);
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const QueryName = `DELETE FROM tb_projects WHERE id =${id}`;

    await sequelizeConfig.query(QueryName);

    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
}

async function editProject(req, res) {
  try {
    const { id } = req.params;
    const { title, startDate, endDate, description } = req.body;

    const updateQuery = `
      UPDATE tb_projects SET title = '${title}', startDate = '${startDate}', endDate = '${endDate}', description = '${description}' 
      WHERE id = '${id}'
    `;

    await sequelizeConfig.query(updateQuery, {
      replacements: { id, title, startDate, endDate, description },
      type: sequelize.QueryTypes.UPDATE,
    });

    res.redirect("/add-project");
  } catch (error) {
    console.log(error);
  }
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, async function (err, dataHash) {
      if (err) {
        res.redirect("/register");
      } else {
        const QueryName = `
        INSERT INTO users(
           name, email, password, "createdAt", "updatedAt")
          VALUES ( '${name}', '${email}', '${dataHash}', NOW(), NOW());`;

        const result = await sequelizeConfig.query(QueryName);

        req.flash("success", "Register Succsessfully");
        res.redirect("/login");
      }
    });

    // console.log(result);
  } catch (error) {
    console.log(error);
  }
}

function loginPage(req, res) {
  res.render("login");
}

async function login(req, res) {
  try {
    console.log("=================================");
    const { email, password } = req.body;

    const QueryName = `SELECT * FROM users WHERE email = '${email}'`;
    const isCheckEmail = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT });
    // check if email none
    if (!isCheckEmail.length) {
      req.flash("danger", "Email has not registered");
      return res.redirect("/login");
    }

    await bcrypt.compare(password, isCheckEmail[0].password, async function (err, result) {
      if (!result) {
        req.flash("danger", "Wrong Password, try Again!!");
        return res.redirect("/login");
      } else {
        req.session.isLogin = true;
        req.session.user = isCheckEmail[0].name;
        req.session.idUser = isCheckEmail[0].id;
        req.flash("success", "Login Success");
        return res.redirect("/home");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
