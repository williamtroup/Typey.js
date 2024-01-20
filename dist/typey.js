/*! Typey.js v0.1.0 | (c) Bunoon | MIT License */
(function() {
    function render() {
      var tagTypes = _configuration.domElementTypes;
      var tagTypesLength = tagTypes.length;
      var tagTypeIndex = 0;
      for (; tagTypeIndex < tagTypesLength; tagTypeIndex++) {
        var domElements = _parameter_Document.getElementsByTagName(tagTypes[tagTypeIndex]);
        var elements = [].slice.call(domElements);
        var elementsLength = elements.length;
        var elementIndex = 0;
        for (; elementIndex < elementsLength; elementIndex++) {
          if (!renderElement(elements[elementIndex])) {
            break;
          }
        }
      }
    }
    function renderElement(element) {
      var result = true;
      if (isDefined(element) && element.hasAttribute(_attribute_Name_Options)) {
        var bindingOptionsData = element.getAttribute(_attribute_Name_Options);
        if (isDefinedString(bindingOptionsData)) {
          var bindingOptions = getObjectFromString(bindingOptionsData);
          if (bindingOptions.parsed && isDefinedObject(bindingOptions.result)) {
            bindingOptions = buildAttributeOptions(bindingOptions.result);
            bindingOptions.element = element;
            element.removeAttribute(_attribute_Name_Options);
            renderText(bindingOptions);
          } else {
            if (!_configuration.safeMode) {
              console.error("The attribute '" + _attribute_Name_Options + "' is not a valid object.");
              result = false;
            }
          }
        } else {
          if (!_configuration.safeMode) {
            console.error("The attribute '" + _attribute_Name_Options + "' has not been set correctly.");
            result = false;
          }
        }
      }
      return result;
    }
    function renderText(bindingOptions) {
      if (!bindingOptions["delete"]) {
        renderTextForwards(bindingOptions);
      } else {
        renderTextBackwards(bindingOptions);
      }
    }
    function renderTextForwards(bindingOptions) {
      var text = bindingOptions.element.innerText;
      var textCharacterCount = 0;
      var textTimerId = newGuid();
      bindingOptions.element.innerHTML = _string.empty;
      _timers[textTimerId] = setInterval(function() {
        bindingOptions.element.innerHTML = text.substring(0, textCharacterCount) + bindingOptions.typingCharacter;
        textCharacterCount++;
        if (textCharacterCount > text.length) {
          if (bindingOptions.repeat) {
            textCharacterCount = 0;
          } else {
            bindingOptions.element.innerHTML = text;
            fireCustomTrigger(bindingOptions.onRenderComplete, bindingOptions.element);
            stopTimer(textTimerId);
          }
        }
      }, bindingOptions.speed);
    }
    function renderTextBackwards(bindingOptions) {
      var text = bindingOptions.element.innerText;
      var textCharacterCount = text.length;
      var textTimerId = newGuid();
      bindingOptions.element.innerHTML = _string.empty;
      _timers[textTimerId] = setInterval(function() {
        bindingOptions.element.innerHTML = text.substring(0, textCharacterCount) + bindingOptions.typingCharacter;
        textCharacterCount--;
        if (textCharacterCount < 0) {
          if (bindingOptions.repeat) {
            textCharacterCount = text.length;
          } else {
            bindingOptions.element.innerHTML = _string.empty;
            fireCustomTrigger(bindingOptions.onRenderComplete, bindingOptions.element);
            stopTimer(textTimerId);
          }
        }
      }, bindingOptions.speed);
    }
    function stopTimers() {
      var textTimerId;
      for (textTimerId in _timers) {
        if (_timers.hasOwnProperty(textTimerId)) {
          stopTimer(textTimerId);
        }
      }
    }
    function stopTimer(textTimerId) {
      clearTimeout(_timers[textTimerId]);
      delete _timers[textTimerId];
    }
    function buildAttributeOptions(newOptions) {
      var options = !isDefinedObject(newOptions) ? {} : newOptions;
      options.speed = getDefaultNumber(options.speed, 100);
      options.typingCharacter = getDefaultString(options.typingCharacter, "_");
      options["delete"] = getDefaultBoolean(options["delete"], false);
      options.repeat = getDefaultBoolean(options.repeat, false);
      return buildAttributeOptionCustomTriggers(options);
    }
    function buildAttributeOptionCustomTriggers(options) {
      options.onRenderComplete = getDefaultFunction(options.onRenderComplete, null);
      return options;
    }
    function isDefined(value) {
      return value !== null && value !== undefined && value !== _string.empty;
    }
    function isDefinedObject(object) {
      return isDefined(object) && typeof object === "object";
    }
    function isDefinedBoolean(object) {
      return isDefined(object) && typeof object === "boolean";
    }
    function isDefinedString(object) {
      return isDefined(object) && typeof object === "string";
    }
    function isDefinedFunction(object) {
      return isDefined(object) && typeof object === "function";
    }
    function isDefinedNumber(object) {
      return isDefined(object) && typeof object === "number";
    }
    function isDefinedArray(object) {
      return isDefinedObject(object) && object instanceof Array;
    }
    function fireCustomTrigger(triggerFunction) {
      if (isDefinedFunction(triggerFunction)) {
        triggerFunction.apply(null, [].slice.call(arguments, 1));
      }
    }
    function getDefaultString(value, defaultValue) {
      return isDefinedString(value) ? value : defaultValue;
    }
    function getDefaultBoolean(value, defaultValue) {
      return isDefinedBoolean(value) ? value : defaultValue;
    }
    function getDefaultFunction(value, defaultValue) {
      return isDefinedFunction(value) ? value : defaultValue;
    }
    function getDefaultArray(value, defaultValue) {
      return isDefinedArray(value) ? value : defaultValue;
    }
    function getDefaultNumber(value, defaultValue) {
      return isDefinedNumber(value) ? value : defaultValue;
    }
    function getDefaultStringOrArray(value, defaultValue) {
      if (isDefinedString(value)) {
        value = value.split(_string.space);
        if (value.length === 0) {
          value = defaultValue;
        }
      } else {
        value = getDefaultArray(value, defaultValue);
      }
      return value;
    }
    function getObjectFromString(objectString) {
      var parsed = true;
      var result = null;
      try {
        if (isDefinedString(objectString)) {
          result = JSON.parse(objectString);
        }
      } catch (e1) {
        try {
          result = eval("(" + objectString + ")");
          if (isDefinedFunction(result)) {
            result = result();
          }
        } catch (e2) {
          if (!_configuration.safeMode) {
            console.error("Errors in object: " + e1.message + ", " + e2.message);
            parsed = false;
          }
          result = null;
        }
      }
      return {parsed:parsed, result:result};
    }
    function newGuid() {
      var result = [];
      var charIndex = 0;
      for (; charIndex < 32; charIndex++) {
        if (charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20) {
          result.push("-");
        }
        var character = Math.floor(Math.random() * 16).toString(16);
        result.push(character);
      }
      return result.join(_string.empty);
    }
    function buildDefaultConfiguration() {
      _configuration.safeMode = getDefaultBoolean(_configuration.safeMode, true);
      _configuration.domElementTypes = getDefaultStringOrArray(_configuration.domElementTypes, ["*"]);
    }
    var _parameter_Document = null;
    var _parameter_Window = null;
    var _configuration = {};
    var _timers = {};
    var _string = {empty:"", space:" "};
    var _attribute_Name_Options = "data-typey-options";
    this.setConfiguration = function(newOptions) {
      _configuration = !isDefinedObject(newOptions) ? {} : newOptions;
      buildDefaultConfiguration();
      return this;
    };
    this.getVersion = function() {
      return "0.1.0";
    };
    (function(documentObject, windowObject) {
      _parameter_Document = documentObject;
      _parameter_Window = windowObject;
      buildDefaultConfiguration();
      _parameter_Document.addEventListener("DOMContentLoaded", function() {
        render();
      });
      _parameter_Window.addEventListener("unload", function() {
        stopTimers();
      });
      if (!isDefined(_parameter_Window.$typey)) {
        _parameter_Window.$typey = this;
      }
    })(document, window);
  })();