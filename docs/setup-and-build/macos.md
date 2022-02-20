https://chromium.googlesource.com/chromium/src/+/main/docs/mac_build_instructions.md#Setting-up-the-build

# SETUP 
Original doc file [here](https://chromium.googlesource.com/chromium/src/+/main/docs/mac_build_instructions.md#install)
## 1. Clone the depot_tools repository
    
    git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git

## 2. Add depot_tools path
Replace "/path/to" to your full path to depot_tools folder
    
    export PATH="$PATH:/path/to/depot_tools"

Example:

    export PATH="$PATH:/Users/username/projects/custom-chromium/depot_tools"

## 3. Generate .ninja files.
    
    cd ./chromium/src
    gn gen ../out/Default

# Build

    cd ../
    autoninja -C out/Default chrome

