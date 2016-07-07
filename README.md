## WARNING: botkitify is under active development, and should be considered non-functional for now.

# botkitify [![Build Status](https://travis-ci.org/shanepelletier/botkitify.svg?branch=master)](https://travis-ci.org/shanepelletier/botkitify)
Easily translate AIML, RiveScript, and more into botkit JS code.

## Installation
Via NPM:
```bash
npm install -g botkitify
```

You can also check out botkitify directly from Git:
```bash
git clone https://github.com/shanepelletier/botkitify.git
```

After cloning the Git repository, you have to install the node dependencies. Navigate to the root of your cloned repository and use npm to install all necessary dependencies.
```bash
npm install
```

## Usage
```
botkitify <filename>
```

botkitify is smart enough to figure out the type of file that is passed to it, but you can also specify the file type by using the ```-t``` option. Currently available options are ```r[ivescipt]``` or ```a[iml]```.
