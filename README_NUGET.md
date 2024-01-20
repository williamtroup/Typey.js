# Typey.js v0.1.0

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Typey.js%2C%20a%20free%20JavaScript%typey%builder&url=https://github.com/williamtroup/Typey.js&hashtags=javascript,html,typey)
[![npm](https://img.shields.io/badge/npmjs-v0.1.0-blue)](https://www.npmjs.com/package/jtypey.js)
[![nuget](https://img.shields.io/badge/nuget-v0.1.0-purple)](https://www.nuget.org/packages/jTypey.js/)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/williamtroup/Typey.js/blob/main/LICENSE.txt)
[![discussions Welcome](https://img.shields.io/badge/discussions-Welcome-red)](https://github.com/williamtroup/Typey.js/discussions)
[![coded by William Troup](https://img.shields.io/badge/coded_by-William_Troup-yellow)](https://www.william-troup.com/)

> A lightweight JavaScript library for printing text using a typewriter effect.


## What features does Typey.js have?

- Zero-dependencies and extremely lightweight!
- Full API available via public functions.
- Fully configurable!
- Fully configurable per element!
- Typewriter effects allow you to type and delete.
- Repeat always, or any number of times.


## What browsers are supported?

All modern browsers (such as Google Chrome, FireFox, and Opera) are fully supported.


## What are the most recent changes?

To see a list of all the most recent changes, click [here](https://github.com/williamtroup/Typey.js/blob/main/docs/CHANGE_LOG.md).


## How do I get started?

To get started using Typey.js, do the following steps:

### 1. Prerequisites:

Make sure you include the "DOCTYPE html" tag at the top of your HTML, as follows:

```markdown
<!DOCTYPE html>
```

### 2. Include Files:

```markdown
<script src="dist/typey.js"></script>
```

### 3. DOM Element Binding:

```markdown
<div data-typey-options="{ 'speed': 100 }">
    <p>This is some example text that should be typed out.</p>
</div>
```

```markdown
<script> 
    var id = $typey.watch( yourObject, {
        onChange: yourCustomJsFunction
    } );
</script>
```

To see a list of all the available binding options you can use for "data-typey-options" click [here](https://github.com/williamtroup/Typey.js/blob/main/docs/binding/options/OPTIONS.md).

To see a list of all the available custom triggers you can use for "data-typey-options" click [here](https://github.com/williamtroup/Typey.js/blob/main/docs/binding/options/CUSTOM_TRIGGERS.md).


### 4. Finishing Up:

That's it! Nice and simple. Please refer to the code if you need more help (fully documented).


## How do I go about customizing Typey.js?

To customize, and get more out of Typey.js, please read through the following documentation.


### 1. Public Functions:

To see a list of all the public functions available, click [here](https://github.com/williamtroup/Typey.js/blob/main/docs/PUBLIC_FUNCTIONS.md).


### 2. Configuration:

Configuration options allow you to customize how Typey.js will function.  You can set them as follows:

```markdown
<script> 
  $typey.setConfiguration( {
      safeMode: false
  } );
</script>
```

To see a list of all the available configuration options you can use, click [here](https://github.com/williamtroup/Typey.js/blob/main/docs/configuration/OPTIONS.md).