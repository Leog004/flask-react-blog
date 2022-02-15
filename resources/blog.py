from flask_restful import Resource, reqparse
from models.blog import BlogModel

class Blog(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('title',type = str, required = False)
    parser.add_argument('text',type = str, required = True, help = 'Each blog must contain a text')
    parser.add_argument('imageUrl',type = str, required = False)


    def get(self, name):
        # Find blog in database | return if exits
        blog = BlogModel.find_by_title(name)
        if blog:
            return blog.data_to_json()

        # Else return error | or blank object
        return {'error' : 'Blog could not be found'}, 401

    def post(self, name):

        if BlogModel.find_by_title(name):
            return {'error' : 'Blog already exits. Please change title'}

        data = Blog.parser.parse_args()
        blog = BlogModel(**data)

        try:
            blog.save_to_db()
        except:
            return {'error': 'Something went wrong while adding a blog into database'}, 401

        return blog.data_to_json()

    def put(self, name):
        data = Blog.parser.parse_args()

        blog = BlogModel.find_by_title(name)

        if not blog:
            return {'error' : 'blog could not be found'}, 401

        try:
            if data['title'] :
                blog.title = data['title']

            blog.text = data['text']
            blog.imageUrl = data['imageUrl']
            blog.save_to_db()
        except:
            return {'error' : 'Something went wrong when updating'}, 401

        return blog.data_to_json_w_oldSlig(name)


    def delete(self, name):
        blog = BlogModel.find_by_title(name)

        if blog:
            blog.remove_from_db()
            return {'message' : 'blog has been deleted'}

        return {'error' , 'blog was not found. Something went wrong'}, 401
            

    


        
            


class BlogList(Resource):
    def get(self):
        return {
            'blogs': [blog.data_to_json() for blog in BlogModel.query.all()]
        }