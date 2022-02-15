from db import db

class BlogModel(db.Model):
    # Table Model
    __tablename__ = 'Blog'
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50), nullable = False)
    text = db.Column(db.String(200), nullable = False)
    imageUrl = db.Column(db.String(), nullable = True)
    
    # Class Properties
    def __init__(self, title, text, imageUrl):
        self.title = title, 
        self.text = text
        self.imageUrl = imageUrl
        self.slug = self.convert_to_slug(title)

    # Model commits
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def remove_from_db(self):
        db.session.delete(self)
        db.session.commit()
    
    # Helper Functions
    def data_to_json(self):
        return {'slug': self.convert_to_slug(self.title), 'title' : self.title, 'text' : self.text, 'imageUrl' : self.imageUrl}

    def convert_to_slug(self, element):
        return element.replace(' ', '-')

    def convert_to_string(url):
        return url.replace('-', ' ')
    
    def data_to_json_w_oldSlig(cls, oldSlug):
        return {'data' : cls.data_to_json(), 'oldSlug': oldSlug}

    # Class Methods
    @classmethod
    def find_by_title(cls, title):
        title = cls.convert_to_string(title)
        return  cls.query.filter_by(title = title).first()