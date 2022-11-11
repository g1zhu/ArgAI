from flask import Flask, request, jsonify
import pandas as pd
import json
import pickle
import torch
import torch.nn as nn
from torchvision import models, transforms
from torch.autograd import Variable
from PIL import Image
import numpy as np
app = Flask(__name__)

def feature_extract(image_dir):
    print("start feature extract")
    vgg_model = models.vgg19(pretrained=True)
    new_classifier = torch.nn.Sequential(*list(vgg_model.children())[-1][:6])
    new_classifier.add_module("Linear output", torch.nn.Linear(4096, 256))
    vgg_model.classifier = new_classifier
    trans = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
    im = Image.open(image_dir).convert('RGB')
    im = trans(im)
    im.unsqueeze_(dim=0)
    vgg_model = vgg_model.eval()
    feature_extracted = vgg_model(im).data.numpy().tolist()[0]
    feature_extracted = [float(i) for i in feature_extracted]
    print("end feature extract")

    return feature_extracted

@app.route("/process", methods=['POST'])
def process():
    if (request.files['file']): 
    
        # access image file 
        image = request.files['file']

        deficit = request.form.get("disturbance_nutrient_deficit")
        feature_extraced = feature_extract(image)
        
        #pca model
        pca_model = pickle.load(open('./pca_model.pkl', 'rb'))
        all_image_features = pd.read_csv('all_image_features.csv', sep=',', header=None).values
        np.append(all_image_features, [feature_extraced])
        pca_reduced = pca_model.fit_transform(all_image_features)[-1]
        print(pca_reduced)
        svm_model = pickle.load(open('./svm_model.pkl', 'rb'))
        label_feature_name = ['expected_yield','drought_probability', 'drought_extent','growth_sowing','growth_vegetative', 'growth_flowering', 'growth_maturity', 'disturbance_none','disturbance_weeds','disturbance_drought','disturbance_nutrient_deficit']
        image_feature_name = ['image_'+str(i) for i in range(0,10)]
        to_predict_col = image_feature_name
        to_predict_data = [0] * 11 
        print(to_predict_data, type(to_predict_data), type(pca_reduced))
        # to_predict_data = [to_predict_data + pca_reduced.tolist()]
        to_predict_data = [pca_reduced.tolist()]
        print(to_predict_data)
        print(to_predict_col)
        to_predict_df = pd.DataFrame(data=to_predict_data,columns=to_predict_col)
        res = svm_model.predict(to_predict_df)[0]
        res = res.capitalize()
        print(res)
    
        return jsonify(crop = res, status = 200 )
    else:
        return jsonify(crop = "something wrong", status = 500)

@app.route("/disease", methods=['POST'])
def disease():
    if (request.files['file']): 
    
        # access image file 
        image = request.files['file']

        deficit = request.form.get("disturbance_nutrient_deficit")
        feature_extraced = feature_extract(image)
        
        
        disease_model = pickle.load(open('./svm_disease_model.pkl', 'rb'))

        to_predict_col = ['image_'+str(i) for i in range(0,256)]
        to_predict_data = [feature_extraced]
        # print(to_predict_data)
        # print(to_predict_col)
        to_predict_df = pd.DataFrame(data=to_predict_data,columns=to_predict_col)
        res = int(disease_model.predict(to_predict_df)[0])
        # res = res.capitalize()
        crop = None
        status = None
        if res == 0:
            crop = "Potato"
            status = "Potato Early Blight"
        elif res == 1:
            crop = "Potato"
            status = "Potato Cercospora Leaf Spot"
        elif res == 2:
            crop = "Corn"
            status = "Corn Northern Leaf Blight"
        elif res == 3:
            crop = "Corn"
            status = "Corn Common Rust"
        elif res == 4:
            crop = "Corn"
            status = "Corn Late Blight"
        elif res == 5:
            crop = "Corn"
            status = "Corn Healthy"
        else:
            crop = "Potato"
            status = "Corn Healthy"
        print(res)
    
        return jsonify(crop = crop, disease = status, status = 200 )
    else:
        return jsonify(crop = "something wrong", status = 500)
