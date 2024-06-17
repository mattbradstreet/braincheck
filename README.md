# BRAINCHECK

This project is a web application that allows users to upload MRI images and receive classifications for Brain Tumors, Alzheimer's disease and Parkinson's disease. The application features a React-based user interface and utilizes three machine learning models for image classification.

## Components
- Button.js: Component for handling the upload button functionality.
- ImageDisplay.js: Component for displaying the uploaded MRI image.
- MainPage.css: CSS file for styling the main page.
- MainPage.js: Main page component that integrates all functionalities.
- TextDisplay.js: Component for displaying error messages and classification results.

## Machine Learning Models
The machine learning models are located in the public folder:
- tfjs_azmodel: TensorFlow.js model for Alzheimer's disease classification.
- tfjs_btmodel: TensorFlow.js model for Brain Tumour classification.
- tfjs_pkmodel: TensorFlow.js model for Parkinson's disease classification.

## Prerequisites
Ensure you have the following installed:
- Node.js
- npm (Node package manager)

## Run
Start the development server:
- npm start

The application will be available at http://localhost:3000
