
Original doc file [here](https://chromium.googlesource.com/chromium/src/+/main/docs/mac_build_instructions.md)

##System requirements:
1) A Mac, Intel or Arm.
2) [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), git comes with...
```
$ git --version
```
3) [Xcode](https://developer.apple.com/xcode/), Xcode comes with...
```
$ ls `xcode-select -p`/Platforms/MacOSX.platform/Developer/SDKs
```
4) [nodejs](https://nodejs.org/en/), nodejs comes with...
```
$  node -v 
```


## Setup
Install node modules
```
$  npm install
```

Project setup (it's a very long process, be patient)
```
$  node ./setup
```
