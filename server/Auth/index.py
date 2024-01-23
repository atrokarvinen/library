from flask import Flask, request, make_response
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

users = [
    {
        "id": 1,
        "username": "test",
        "password": "test",
    }
]


@app.route("/", methods=["GET"])
def hello_world():
    print("cookies: " + str(request.cookies))
    print("testing")
    return "<p>Hello, World!</p>"


@app.route("/signin", methods=["Get"])
def testSignIn():
    return "Works"


@app.route("/signin", methods=["POST"])
def signIn():
    # signIn = async (req: Request, res: Response, next: NextFunction) => {
    #   try {
    #     const { username, password } = req.body;
    #     const validationError = await this.authService.validateSignIn(
    #       username,
    #       password
    #     );
    #     if (validationError) {
    #       return res.status(400).json({ message: validationError });
    #     }
    #     const user = await this.authService.signIn(username);
    #     res
    #       .cookie("userId", user!.id, { secure: true, sameSite: "none" })
    #       .json(user);
    #   } catch (error) {
    #     next(error);
    #   }
    # };
    print("Request payload: " + str(request.json))
    print("username: " + request.json["username"])
    username = request.json["username"]
    password = request.json["password"]
    user = next((user for user in users if user["username"] == username), None)
    if not user:
        return {"message": "User '" + username + "' does not exist"}, 400
    passwordMatches = user["password"] == password
    if not passwordMatches:
        return {"message": "Password does not match"}, 400

    resp = make_response({"username": username, "id": user["id"]})
    resp.set_cookie("userId", str(user["id"]), secure=True, samesite="none")
    return resp


@app.route("/signup", methods=["POST"])
def signUp():
    # signUp = async (req: Request, res: Response, next: NextFunction) => {
    #   try {
    #     const { username, password, confirmPassword } = req.body;
    #     const validationError = await this.authService.validateSignUp(req.body);
    #     if (validationError) {
    #       return res.status(400).json({ message: validationError });
    #     }
    #     const user = await this.authService.signUp(username, password);
    #     res.json(user);
    #   } catch (error) {
    #     next(error);
    #   }
    # };
    return "<p>Hello, World! Kana</p>"


@app.route("/logout", methods=["POST"])
def logout():
    # logout = async (req: Request, res: Response, next: NextFunction) => {
    #   try {
    #     const userId = req.userId;
    #     if (!userId) {
    #       return res.status(403).json({ message: "Unauthenticated" });
    #     }
    #     const user = await this.authService.logout(userId);
    #     res.clearCookie("userId").json(user);
    #   } catch (error) {
    #     next(error);
    #   }
    # };
    return "<p>Hello, World! Kana</p>"


@app.route("/generate", methods=["POST"])
def generateUser():
    # generate = async (req: Request, res: Response, next: NextFunction) => {
    #   try {
    #     const user = await this.authService.generate();
    #     res.json(user);
    #   } catch (error) {
    #     next(error);
    #   }
    # };
    return "<p>Hello, World! Kana</p>"
