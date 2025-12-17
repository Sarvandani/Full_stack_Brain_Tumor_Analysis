#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Train and save the brain tumor detection model
"""
import numpy as np
import os
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from PIL import Image
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight
import json

# Paths to data directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
YES_DIR = os.path.join(BASE_DIR, 'data', 'brain_tumor_dataset', 'yes')
NO_DIR = os.path.join(BASE_DIR, 'data', 'brain_tumor_dataset', 'no')
MODEL_DIR = os.path.join(BASE_DIR, 'backend', 'models')
MODEL_PATH = os.path.join(MODEL_DIR, 'brain_tumor_model.keras')

def load_data():
    """Load and preprocess images from directories"""
    data = []
    labels = []
    
    print("Loading images with tumors...")
    # Load images with tumors (label = 1)
    if os.path.exists(YES_DIR):
        for file in os.listdir(YES_DIR):
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                try:
                    path = os.path.join(YES_DIR, file)
                    img = Image.open(path)
                    img = img.resize((128, 128))
                    img = np.array(img)
                    if img.shape == (128, 128, 3):
                        data.append(img)
                        labels.append(1)
                except Exception as e:
                    print(f"Error loading {file}: {e}")
                    continue
    
    print("Loading images without tumors...")
    # Load images without tumors (label = 0)
    if os.path.exists(NO_DIR):
        for file in os.listdir(NO_DIR):
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                try:
                    path = os.path.join(NO_DIR, file)
                    img = Image.open(path)
                    img = img.resize((128, 128))
                    img = np.array(img)
                    if img.shape == (128, 128, 3):
                        data.append(img)
                        labels.append(0)
                except Exception as e:
                    print(f"Error loading {file}: {e}")
                    continue
    
    data = np.array(data)
    labels = np.array(labels).reshape(data.shape[0], 1)
    
    print(f'Data shape: {data.shape}')
    print(f'Labels shape: {labels.shape}')
    print(f'Number of tumor images: {np.sum(labels == 1)}')
    print(f'Number of no-tumor images: {np.sum(labels == 0)}')
    
    return data, labels

def create_model():
    """Create an improved CNN model architecture with better accuracy"""
    model = keras.Sequential([
        # First Conv Block
        layers.Conv2D(filters=32, kernel_size=(3,3), activation="relu", padding='same', input_shape=[128, 128, 3]),
        layers.BatchNormalization(),
        layers.Conv2D(filters=32, kernel_size=(3,3), activation="relu", padding='same'),
        layers.MaxPool2D(pool_size=(2,2)),
        layers.Dropout(0.25),
        
        # Second Conv Block
        layers.Conv2D(filters=64, kernel_size=(3,3), activation="relu", padding='same'),
        layers.BatchNormalization(),
        layers.Conv2D(filters=64, kernel_size=(3,3), activation="relu", padding='same'),
        layers.MaxPool2D(pool_size=(2,2)),
        layers.Dropout(0.25),
        
        # Third Conv Block
        layers.Conv2D(filters=128, kernel_size=(3,3), activation="relu", padding='same'),
        layers.BatchNormalization(),
        layers.Conv2D(filters=128, kernel_size=(3,3), activation="relu", padding='same'),
        layers.MaxPool2D(pool_size=(2,2)),
        layers.Dropout(0.25),
        
        # Fourth Conv Block
        layers.Conv2D(filters=256, kernel_size=(3,3), activation="relu", padding='same'),
        layers.BatchNormalization(),
        layers.Conv2D(filters=256, kernel_size=(3,3), activation="relu", padding='same'),
        layers.MaxPool2D(pool_size=(2,2)),
        layers.Dropout(0.25),
        
        # Dense Layers
        layers.Flatten(),
        layers.Dense(units=512, activation="relu"),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(units=256, activation="relu"),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(units=1, activation="sigmoid"),
    ])
    
    # Use learning rate scheduling
    initial_learning_rate = 0.001
    lr_schedule = keras.optimizers.schedules.ExponentialDecay(
        initial_learning_rate,
        decay_steps=100,
        decay_rate=0.96,
        staircase=True
    )
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=lr_schedule),
        loss='binary_crossentropy',
        metrics=['accuracy', 'precision', 'recall']
    )
    
    return model

def train():
    """Train the model"""
    print("=" * 50)
    print("Brain Tumor Detection Model Training")
    print("=" * 50)
    
    # Load data
    data, labels = load_data()
    
    if len(data) == 0:
        raise ValueError("No images found! Please check the data directories.")
    
    # Normalize data
    data = data / 255.0
    print(f"Data normalized. Min: {np.min(data)}, Max: {np.max(data)}")
    
    # Split data
    x_train, x_test, y_train, y_test = train_test_split(
        data, labels, test_size=0.2, shuffle=True, random_state=7, stratify=labels
    )
    
    print(f"Training samples: {x_train.shape[0]}")
    print(f"Test samples: {x_test.shape[0]}")
    
    # Calculate class weights to handle imbalanced data
    class_weights = compute_class_weight(
        'balanced',
        classes=np.unique(y_train.flatten()),
        y=y_train.flatten()
    )
    class_weight_dict = {0: class_weights[0], 1: class_weights[1]}
    print(f"Class weights: {class_weight_dict}")
    
    # Create data augmentation generator
    datagen = ImageDataGenerator(
        rotation_range=20,
        width_shift_range=0.1,
        height_shift_range=0.1,
        shear_range=0.1,
        zoom_range=0.1,
        horizontal_flip=True,
        fill_mode='nearest'
    )
    datagen.fit(x_train)
    
    # Create model
    model = create_model()
    model.summary()
    
    # Create models directory if it doesn't exist
    os.makedirs(MODEL_DIR, exist_ok=True)
    
    # Enhanced callbacks
    early_stopping = keras.callbacks.EarlyStopping(
        monitor='val_accuracy',
        patience=15,
        min_delta=0.001,
        restore_best_weights=True,
        verbose=1
    )
    
    checkpoint = keras.callbacks.ModelCheckpoint(
        MODEL_PATH,
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1,
        mode='max'
    )
    
    reduce_lr = keras.callbacks.ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=5,
        min_lr=0.00001,
        verbose=1
    )
    
    # Train model with data augmentation
    print("\nStarting training with data augmentation...")
    history = model.fit(
        datagen.flow(x_train, y_train, batch_size=32),
        steps_per_epoch=len(x_train) // 32,
        validation_data=(x_test, y_test),
        epochs=200,
        class_weight=class_weight_dict,
        callbacks=[early_stopping, checkpoint, reduce_lr],
        verbose=1
    )
    
    # Evaluate model
    print("\nEvaluating model...")
    test_loss, test_accuracy = model.evaluate(x_test, y_test, verbose=0)
    print(f"Test Loss: {test_loss:.4f}")
    print(f"Test Accuracy: {test_accuracy:.4f}")
    
    # Save final model
    model.save(MODEL_PATH)
    print(f"\nModel saved to: {MODEL_PATH}")
    
    # Save training history
    history_path = os.path.join(MODEL_DIR, 'training_history.json')
    history_dict = {
        'loss': [float(x) for x in history.history['loss']],
        'accuracy': [float(x) for x in history.history['accuracy']],
        'val_loss': [float(x) for x in history.history['val_loss']],
        'val_accuracy': [float(x) for x in history.history['val_accuracy']]
    }
    with open(history_path, 'w') as f:
        json.dump(history_dict, f, indent=2)
    print(f"Training history saved to: {history_path}")
    
    print("\nTraining completed successfully!")

if __name__ == "__main__":
    train()

