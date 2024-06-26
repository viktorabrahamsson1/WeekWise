# Fullstack productivity + calender app with the mern stack

## Introduktion

Detta projekt är ett slutprojekt i kursen webserverprogrammering och är en kalender och produktivitets webb-app som är byggd med mern stacken
(mongodb,express,react och node). På klient sidan av applikationen så använder jag mig av react, react query, react router och tailwind. Jag
använder mig utav typescript på både klient och servern. Denna dokumentation kommer inte att innehålla klient sidan av applikationen utan
endast server sidan.

## Server (node, express, mongodb)

### index.ts

```
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.get("/", (_, res) => res.send("Server is working"));

app.use("/api/auth", authRoutes);
app.use("/api/createUser", registerUserRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/column", columnRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/calenderTask", calenderTasksRoutes);

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});

```

I index.ts connectar jag men databasen (mongodb) samt olika middlewares för säkerhet och enklare utveckling.

Jag använder mig ofta utav miljövariablar som jag kommer åt via process.env.[variabel namn] för att inte låta viktig information
såsom inloggningar vara synliga i koden så att någon kan komma åt den.

Jag skapar själva servern med express() functionen som jag sedan använder listen metoden på så att servern kommer lyssna på en
specifik port.

De primära middlewarsen som jag använder mig utav är dessa:
cookieparser: för att enklare hantera cookies.
json: för att enklare arbeta med json data.
cors: för säkerhet - endast tillåta requests från en url (frontend urlen)

Sen defineras de olika routarna med dess respektive route fil. Detta gör jag eftersom jag vill strukturera upp kod och separera
koden så tillhörande kod finns i samma fil.

servern skapas med express() och vi väljer en port 9000 för att lyssna för requests.

### Modeler

```
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin", "superAdmin"],
  },
  progress: {
    type: { tasks: Number, completedTasks: Number },
    required: true,
    default: { tasks: 0, completedTasks: 0, inCompletedTasks: 0 },
  },
  isVerified: { type: Boolean, required: true, default: false },
  verificationToken: { type: String },
  createdAt: { type: String, required: true },
});
```

Här skapar jag ett användar schema som innehåller de properties som varje användar dokument ska innehålla som ex: namn,email och lösenord.
Schemat innehåller även vilken roll använderen har och vilken typ alla properties är.

Detta schemat är då den struktur som varje användar dokument kommer se ut i databasen (mongodb i detta fall).

### Middleware

```
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

```

I samma fil som förgående stycke skapar jag en middleware för användarna som säger att när ett nytt document skapas eller ändras så
kollar middlewaren om propertien password har ändras och isåfall krypteras lösenordet innan det sedan sparas till databasen så att
lösenordet säkras.

Jag använder bcrypt bilioteket för att hasha lösenorden och använder en kostnadsfaktor på 8. Denna kostnadsfaktor bestämmer hur
väl och säkert något ska krypteras och ju högre man sätter siffran ju säkrare blir krypteringen men operationen blir exponentiellt
långsammare. Standard faktorn brukar vara mellan 10-12 men för effektivitet har jag valt 8.

```
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    req.role = (decoded as JwtPayload).userRole;
    req.firstName = (decoded as JwtPayload).firstName;
    req.lastName = (decoded as JwtPayload).lastName;
    req.email = (decoded as JwtPayload).email;
    req.isVerified = (decoded as JwtPayload).isVerified;

    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};
```

Här är yttligare en middleware vars syfte är att kolla om det finns en cookie vid namn auth_token för att se om användaren är inloggad.
Om det då finns en cookie vid namn auth_token så används jwt för att jämföra om den token skapades med rätt nyckel. Om nyckeln stämmer så är
allt som det ska och vi påbörjar att lägga till properties till request objektet för att vi senare ska kunna komma åt denna information smidigt.
Tillsist så kallas next funktionen vilket innebör att denna middlewares arbete är färdig och nästkommande middleware kan påbörja sina operationer.
Om något däremot går fel under tiden så fångar catch blocket upp felet (error) och retunerar en statuskod och json och näst kommande middleware
kommer inte att kallas.

### Config

```
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;

```

Här configurerar jag nodemailer ännu ett npm paket så att sidan kan skicka mail vid autentisering av emailen. Här skriver jag endast
in vilken service mailen ska använda sig av (gmail i detta fall) samt inloggningen till mail adressen som jag kommer åt från
miljö variablar så att den informationen inte är synlig i koden.

### Utils

```
const createAuthToken = (_: Request, res: Response, user: UserType) => {
  const token = jwt.sign(
    {
      userId: user.id,
      userRole: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isVerified: user.isVerified,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  });
};

```

Innti utils mapen så har jag kod som återanvänds på flera ställen så att jag inte behöver skriva samma kod flera gånger. I just denna kod
så skapas den token som jag skrev om innan (auth_token). Här använder jag mig av jwt återigen för att embeda data i denna token så
att den senare kan kommas åt vid behov. Som andra argument av denna sign funktionen så matar jag in den nyckel som är "ansvarig" för
denna token så att man bara kan komma åt denna data om man har denna nyckel, vilket ökar säkerheten. Sista argumentet i sign funktionen
är ett objekt som man kan definera olika valmöjligheter för tokenen, vilket i detta fall ändast är livslängden (1 dag).

```
export const sendVerificationEmail = (email: string, token: string) => {
  const frontEndUrl = process.env.FRONTEND_URL;

  const mailOptions = {
    from: "Viktor Abrahamsson at WeekWise.se",
    to: email,
    subject: "Verify Email",
    html: `<div>Hi 👋, Please click on this link <a href="${frontEndUrl}/register/${token}">${frontEndUrl}</a> to verify your email. \n
    <span>Please check your spam folder if the email does not appear.</span> </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};
```

Här är ännu en funktion i min utlis map som står för att skicka ut mail. Eftersom det på olika ställen i applicationen behövs mail utskickad
så har jag skrivit en generell funktion för det. Här använder jag mig av nodemailer och har följt deras allmäna struktur för vad som behövs
för att skicka ut mail. Vilket är ett objekt med nödvändig information angående mailet och sedan transportern som tar hand om att
faktiskt skicka mailet med den information som tidigare definerats.

### Routes

```
router.post(
  "/login",
  [
    check("email", "Invalid credentials").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      if (!user.isVerified) {
        return res.status(400).json({ message: "Email not verified" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      createAuthToken(req, res, user);

      res.status(200).json({ message: "Successfully logged in" });
    } catch (error) {
      return res.json(500).json({ message: "Something went wrong" });
    }
  },
);
```

Sedan har jag en routes map som innehåller mer eller mindre all funktionalitet på sidan. I varje route fil så finns alla endpoints
relaterade till varandra som exempel: autentisering. Just denna endpoint är lokaliserad i en route kallad auth. I denna route finns
denna endpointen där jag använder mig av check funktionen från express validator paketet för att kolla om det är en email och att
lösenordets längd är tillräcklig. Sedan kollar jag om jag fick något error från check funktionerna med validationResult funktionen.
Sen tas emailen och lösenordet från requesten och kollar om det finns något konto med den mailen, om inte retunerar vi med ett meddelande
"invalide credentials". Om emailen finns kollar vi om den är verifierad och om inte händer samma sak som innan. Sen använder jag bcrypt
paketet för att kolla om lösenordet vi fick från requesten matchar med lösenordet från databasen, ifall det inte matchar blir det ännu
ett "invalid credentials". Om allt matchar så skapas en token och en cookie skickas med responsen som vi tidgare sett, samt en
statuskod och meddelande som säger att allt gick bra.

## Request från klienten

```
export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Problem signing out");
  }
};
```

Här är signOut requesten som skickas från klienten till servern när en användare försöker att logga ut. Nyckeln till denna funktionalitet
är cookies och dessa cookies skickas med requesten eftersom credentials är satt till "include". Eftersom cookies är en credentails så följer
"aktiva" cookies med i requesten, som sedan kan användas på servern och i middlewares där jag använder dem.

## Diskussion

Eftersom jag har haft denna kurs på distans och därmed inte varit på lektioner så har min inlärning kommit från online resurser
såsom youtube och dokumentationer (node, npm bilioteket). Jag påbörjade min inlärningsprocess genom att kolla på en youtube
tutorial angående node,express och backend i allmänhet för att få en överblick hur allt fungerade och hänger ihop. Jag har hört mycket
om det såkallade "tutorial hell" och ville inte bli beroende av tutorials och valde att direkt efter introduktionen börja bygga små projekt.
Några småprojekt senare då jag började känna mig "bekväm" med att börja bygga något större så påbörjade jag detta projekt.

Under detta projektets gång stötte jag ständigt på problem och saker som jag inte visste hur man gjorde men som jag verkligen ville göra.
Jag vände mig återigen till online resurser, speciellt dokumentation och läste mycket och försökte förstå mig på det jag ville göra. Detta
är till stor del hur min arbetsprocess såg ut på server sidan av projektet: Jag ville göra något men visste inte hur, jag läste dokumentation
och till viss del någon tutorial kring vissa npm paket och sedan fortsatte.

Eftersom alla dessa teknologier var nya för mig, inklusive databaser spenderade jag en massa tid för att lära mig grunderna inom dessa
innan jag implemanterade det i projeket. Detta är hur min inlärning och arbetsprocess har sett ut under projektet.
