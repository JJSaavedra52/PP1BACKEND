import store from "./store.mjs";

const login = async (req, res) => {
    const { user, password } = req.body;
    try {
        const userData = await store.getUserAndPassword(user);
        if (userData.password !== password) {
            res.status(401).send('Invalid user or password');
        } else {
            res.status(200).send('Login successful');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// rest of your code...

export default login;
