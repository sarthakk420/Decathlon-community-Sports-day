from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/dell/Desktop/DECATHLON PROJECT/pycache/instance/your_database.db'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

@app.route('/create_database', methods=['GET'])
def create_database():
    with app.app_context():
        db.create_all()
    return 'Database tables created'


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        try:
            req_json=request.get_json()
            name = req_json['name']
            print("name",name)
            email = req_json['email']
            print("email",email)
            user = User(name=name, email=email)
            db.session.add(user)
            db.session.commit()
            return 'User registered successfully!'
        except Exception as e:
            print(f"Error during user registration: {str(e)}")
            return 'User registration failed. Please check the server logs for details.'

@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        user_list = [{'name': user.name, 'email': user.email} for user in users]
        print("userlist",user_list)
        return jsonify(user_list)
    except Exception as e:
        print(f"Error during data retrieval: {str(e)}")
        return 'Error fetching user data. Please check the server logs for details.'


if __name__ == '__main__':
    app.run(debug=True)





