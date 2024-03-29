/**
 * Typey.js
 * 
 * A lightweight JavaScript library for printing text using a typewriter effect.
 * 
 * @file        typey.js
 * @version     v0.1.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2023
 */


( function() {
    var // Variables: Constructor Parameters
        _parameter_Document = null,
        _parameter_Window = null,

        // Variables: Configuration
        _configuration = {},

        // Variables: Timers
        _timers = {},

        // Variables: Strings
        _string = {
            empty: "",
            space: " "
        },

        // Variables: Attribute Names
        _attribute_Name_Options = "data-typey-options";

    
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Rendering
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function render() {
        var tagTypes = _configuration.domElementTypes,
            tagTypesLength = tagTypes.length;

        for ( var tagTypeIndex = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++ ) {
            var domElements = _parameter_Document.getElementsByTagName( tagTypes[ tagTypeIndex ] ),
                elements = [].slice.call( domElements ),
                elementsLength = elements.length;

            for ( var elementIndex = 0; elementIndex < elementsLength; elementIndex++ ) {
                if ( !renderElement( elements[ elementIndex ] ) ) {
                    break;
                }
            }
        }
    }

    function renderElement( element ) {
        var result = true;

        if ( isDefined( element ) && element.hasAttribute( _attribute_Name_Options ) ) {
            var bindingOptionsData = element.getAttribute( _attribute_Name_Options );

            if ( isDefinedString( bindingOptionsData ) ) {
                var bindingOptions = getObjectFromString( bindingOptionsData );

                if ( bindingOptions.parsed && isDefinedObject( bindingOptions.result ) ) {
                    bindingOptions = buildAttributeOptions( bindingOptions.result );
                    bindingOptions.element = element;

                    element.removeAttribute( _attribute_Name_Options );

                    fireCustomTrigger( bindingOptions.onBeforeRender, bindingOptions.element );
                    renderText( bindingOptions );

                } else {
                    if ( !_configuration.safeMode ) {
                        console.error( "The attribute '" + _attribute_Name_Options + "' is not a valid object." );
                        result = false;
                    }
                }

            } else {
                if ( !_configuration.safeMode ) {
                    console.error( "The attribute '" + _attribute_Name_Options + "' has not been set correctly." );
                    result = false;
                }
            }
        }

        return result;
    }

    function renderText( bindingOptions ) {
        if ( !bindingOptions.delete ) {
            renderTextForwards( bindingOptions );
        } else {
            renderTextBackwards( bindingOptions );
        }
    }

    function renderTextForwards( bindingOptions ) {
        var text = bindingOptions.element.innerText,
            textCharacterCount = 0,
            textTimerId = newGuid(),
            runCount = 0;

        bindingOptions.element.innerHTML = _string.empty;

        _timers[ textTimerId ] = setInterval( function() {
            bindingOptions.element.innerHTML = text.substring( 0, textCharacterCount ) + bindingOptions.typingCharacter;
            textCharacterCount++;

            if ( textCharacterCount > text.length ) {
                runCount++;

                if ( bindingOptions.repeat && ( !isDefinedNumber( bindingOptions.maximumRepeats ) || runCount < bindingOptions.maximumRepeats ) ) {
                    textCharacterCount = 0;

                } else {
                    bindingOptions.element.innerHTML = text;
                    
                    fireCustomTrigger( bindingOptions.onRenderComplete, bindingOptions.element );
                    stopTimer( textTimerId );
                }
            }

        }, bindingOptions.speed );
    }

    function renderTextBackwards( bindingOptions ) {
        var text = bindingOptions.element.innerText,
            textCharacterCount = text.length,
            textTimerId = newGuid(),
            runCount = 0;

        bindingOptions.element.innerHTML = _string.empty;

        _timers[ textTimerId ] = setInterval( function() {
            bindingOptions.element.innerHTML = text.substring( 0, textCharacterCount ) + bindingOptions.typingCharacter;
            textCharacterCount--;

            if ( textCharacterCount < 0 ) {
                runCount++;
                
                if ( bindingOptions.repeat && ( !isDefinedNumber( bindingOptions.maximumRepeats ) || runCount < bindingOptions.maximumRepeats ) ) {
                    textCharacterCount = text.length;

                } else {
                    bindingOptions.element.innerHTML = _string.empty;

                    fireCustomTrigger( bindingOptions.onRenderComplete, bindingOptions.element );
                    stopTimer( textTimerId );
                }
            }

        }, bindingOptions.speed );
    }

    function stopTimers() {
        for ( var textTimerId in _timers ) {
            if ( _timers.hasOwnProperty( textTimerId ) ) {
                stopTimer( textTimerId );
            }
        }
    }

    function stopTimer( textTimerId ) {
        clearTimeout( _timers[ textTimerId ] );
        delete _timers[ textTimerId ];
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Options
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildAttributeOptions( newOptions ) {
        var options = !isDefinedObject( newOptions ) ? {} : newOptions;
        options.speed = getDefaultNumber( options.speed, 100 );
        options.typingCharacter = getDefaultString( options.typingCharacter, "_" );
        options.delete = getDefaultBoolean( options.delete, false );
        options.repeat = getDefaultBoolean( options.repeat, false );
        options.maximumRepeats = getDefaultNumber( options.maximumRepeats, null );

        return buildAttributeOptionCustomTriggers( options );
    }

    function buildAttributeOptionCustomTriggers( options ) {
        options.onBeforeRender = getDefaultFunction( options.onBeforeRender, null );
        options.onRenderComplete = getDefaultFunction( options.onRenderComplete, null );

        return options;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Validation
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isDefined( value ) {
        return value !== null && value !== undefined && value !== _string.empty;
    }

    function isDefinedObject( object ) {
        return isDefined( object ) && typeof object === "object";
    }

    function isDefinedBoolean( object ) {
        return isDefined( object ) && typeof object === "boolean";
    }

    function isDefinedString( object ) {
        return isDefined( object ) && typeof object === "string";
    }

    function isDefinedFunction( object ) {
        return isDefined( object ) && typeof object === "function";
    }

    function isDefinedNumber( object ) {
        return isDefined( object ) && typeof object === "number";
    }

    function isDefinedArray( object ) {
        return isDefinedObject( object ) && object instanceof Array;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Triggering Custom Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function fireCustomTrigger( triggerFunction ) {
        if ( isDefinedFunction( triggerFunction ) ) {
            triggerFunction.apply( null, [].slice.call( arguments, 1 ) );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Default Parameter/Option Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getDefaultString( value, defaultValue ) {
        return isDefinedString( value ) ? value : defaultValue;
    }

    function getDefaultBoolean( value, defaultValue ) {
        return isDefinedBoolean( value ) ? value : defaultValue;
    }

    function getDefaultFunction( value, defaultValue ) {
        return isDefinedFunction( value ) ? value : defaultValue;
    }

    function getDefaultArray( value, defaultValue ) {
        return isDefinedArray( value ) ? value : defaultValue;
    }

    function getDefaultNumber( value, defaultValue ) {
        return isDefinedNumber( value ) ? value : defaultValue;
    }

    function getDefaultStringOrArray( value, defaultValue ) {
        if ( isDefinedString( value ) ) {
            value = value.split( _string.space );

            if ( value.length === 0 ) {
                value = defaultValue;
            }

        } else {
            value = getDefaultArray( value, defaultValue );
        }

        return value;
    }

    function getObjectFromString( objectString ) {
        var parsed = true,
            result = null;

        try {
            if ( isDefinedString( objectString ) ) {
                result = JSON.parse( objectString );
            }

        } catch ( e1 ) {

            try {
                result = eval( "(" + objectString + ")" );

                if ( isDefinedFunction( result ) ) {
                    result = result();
                }
                
            } catch ( e2 ) {
                if ( !_configuration.safeMode ) {
                    console.error( "Errors in object: " + e1.message + ", " + e2.message );
                    parsed = false;
                }
                
                result = null;
            }
        }

        return {
            parsed: parsed,
            result: result
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * String Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function newGuid() {
        var result = [];

        for ( var charIndex = 0; charIndex < 32; charIndex++ ) {
            if ( charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20 ) {
                result.push( "-" );
            }

            var character = Math.floor( Math.random() * 16 ).toString( 16 );
            result.push( character );
        }

        return result.join( _string.empty );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Configuration
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * setConfiguration().
     * 
     * Sets the specific configuration options that should be used.
     * 
     * @public
     * 
     * @param       {Options}   newConfiguration                            All the configuration options that should be set (refer to "Options" documentation for properties).
     * 
     * @returns     {Object}                                                The Typey.js class instance.
     */
    this.setConfiguration = function( newOptions ) {
        _configuration = !isDefinedObject( newOptions ) ? {} : newOptions;
        
        buildDefaultConfiguration();

        return this;
    };

    function buildDefaultConfiguration() {
        _configuration.safeMode = getDefaultBoolean( _configuration.safeMode, true );
        _configuration.domElementTypes = getDefaultStringOrArray( _configuration.domElementTypes, [ "*" ] );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Additional Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * getVersion().
     * 
     * Returns the version of Typey.js.
     * 
     * @public
     * 
     * @returns     {string}                                                The version number.
     */
    this.getVersion = function() {
        return "0.1.0";
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Typey.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( function ( documentObject, windowObject ) {
        _parameter_Document = documentObject;
        _parameter_Window = windowObject;

        buildDefaultConfiguration();

        _parameter_Document.addEventListener( "DOMContentLoaded", function() {
            render();
        } );

        _parameter_Window.addEventListener( "unload", function() {
            stopTimers();
        } );

        if ( !isDefined( _parameter_Window.$typey ) ) {
            _parameter_Window.$typey = this;
        }

    } ) ( document, window );
} )();