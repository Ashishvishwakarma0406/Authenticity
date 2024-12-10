import tensorflow as tf
from tensorflow.keras.utils import load_img, img_to_array
import numpy as np
import os
from flask import Flask, render_template, request
import io
from PIL import Image

app = Flask(__name__)

# Load the trained model
def load_model(model_path):
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}")
    return tf.keras.models.load_model(model_path)

# Function to preprocess the image
def preprocess_image(img, target_size):
    # Convert to array and normalize
    img_array = img_to_array(img) / 255.0
    
    # Expand dimensions to match the model input
    return np.expand_dims(img_array, axis=0)


@app.route('/', methods=['GET', 'POST'])
def login():
    fake_confidence = None  # Initialize the confidence value
    real_confidence = None
    if request.method == 'POST':
        # Get the image file from the form
        uploaded_file = request.files['image']
        
        if uploaded_file:
            # Convert the uploaded file to an image using BytesIO
            img_bytes = uploaded_file.read()
            img = Image.open(io.BytesIO(img_bytes))
            
            # Load model
            model_path = "Classifcation_model.h5"  # Replace with your model's path
            model = load_model(model_path)
            
            # Preprocess the image
            img = img.resize((256, 256))  # Resize the image to the input shape of your model
            img_array = preprocess_image(img, target_size=(256, 256))
            
            # Predict the fake percentage
            prediction = model.predict(img_array)
            
            # Calculate fake confidence
            real_confidence = prediction[0][0] * 100
            fake_confidence = (1 - prediction[0][0]) * 100
        
    return render_template('final.html', real_confidence=real_confidence,fake_confidence=fake_confidence)

# Main function
if __name__ == "__main__":
    app.run(debug=True)
