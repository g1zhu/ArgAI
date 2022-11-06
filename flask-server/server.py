import os
from flask import Flask, jsonify, render_template, request
from keras.applications.vgg16 import VGG16
from keras.preprocessing import image
from keras.utils import image_utils
from keras.utils import load_img, img_to_array
from keras.applications.vgg16 import preprocess_input, decode_predictions
import numpy as np
from PIL import ImageFile, Image
from numpy import expand_dims
from werkzeug.utils import secure_filename
from keras.models import load_model

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
ImageFile.LOAD_TRUNCATED_IMAGES = True

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello from FLASK"


@app.route("/process", methods=['POST'])
def process():
  if (request.files['file']): 
    file = request.files['file']
    model = VGG16(weights='imagenet')
    
    original_image = Image.open(file)
    original_image = original_image.convert('RGB')
    original_image = original_image.resize((224, 224), Image.NEAREST)
    
    x = img_to_array(original_image)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    features = model.predict(x)
    p = decode_predictions(features, top=1)
    # prediction[0][0][1] is eqaul to the first batch, top prediction and class_description
    result = str(p[0][0][1])
    
    return jsonify(result = result, status = 200)
  else:
    return jsonify(result = "something wrong", status = 500)


if __name__ == "__main__":
    app.run(debug=True)
