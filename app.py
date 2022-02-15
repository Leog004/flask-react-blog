import os
from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS, cross_origin

from resources.blog import Blog, BlogList

app = Flask(__name__, static_folder='my-app/build', static_url_path='')
uri = os.environ.get('DATABASE_URL')
if uri.startswith('postgres://'):
    uri = uri.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'flask_blog'
CORS(app)
api = Api(app)


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.before_first_request
def create_tables():
    db.create_all()    

api.add_resource(Blog, '/api/blog/<string:name>') # router configuration for get, create, update, and delete a blog | must conating a string
api.add_resource(BlogList, '/api/blog') # router configuration for getting all the blogs that we currently have


if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(debug=True)

