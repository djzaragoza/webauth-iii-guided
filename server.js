const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send("It's alive!");
});

server.get('/token', (req, res) => {
    const payload = {
        subject: "user",
        username: "skirkby",
        favoriteChili: "habanero"
    };

    const secret = "wethotuwasatoad";

    const options = {
        expiresIn: '1h'
    };

    const token = jwt.sign(payload, secret, options);
    console.log(token);
})

module.exports = server;