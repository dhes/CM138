#!/bin/bash

# Define the project root (assuming you run the script from the project root)
PROJECT_ROOT="$(pwd)"

# Define absolute paths for source and target directories
SOURCE_DIR="${PROJECT_ROOT}/input/tests/plandefinition/Smoking"
TARGET_DIR="${PROJECT_ROOT}/input/tests/measure/PreventiveCareAndTobaccoUseScreeningAndCessationInterventionFHIR"

# Remove existing symlinks in the target directory to avoid duplicates
find "$TARGET_DIR" -type l -delete

# Change to the source directory; exit if it doesn't exist
cd "$SOURCE_DIR" || { echo "Source directory not found!"; exit 1; }

# Recursively create symlinks for all files and folders in SOURCE_DIR
find . -mindepth 1 | while IFS= read -r entry; do
    # Build the full destination path for the symlink
    symlink_path="${TARGET_DIR}/${entry}"
    
    # Create the parent directories in the target if needed
    mkdir -p "$(dirname "$symlink_path")"
    
    # Create the symbolic link using the absolute source path
    ln -s "${SOURCE_DIR}/${entry}" "$symlink_path"
done

echo "Symlinks created successfully."