# Typey.js - Functions:

Below is a list of all the public functions that can be called from the Typey.js instance.
<br>
<br>


<h1>Configuration:</h1>

### **setConfiguration( *newOptions* )**:
Sets the specific configuration options that should be used.
<br>
***Parameter: newOptions***: '*Options*' - All the configuration options that should be set (refer to ["Configuration Options"](configuration/OPTIONS.md) documentation for properties).
<br>
***Returns***: '*Object*' - The Typey.js class instance.
<br>
<br>


<h1>Additional Data:</h1>

### **getVersion()**:
Returns the version of Typey.js.
<br>
***Returns***: '*string*' - The version number.
<br>
<br>


## Example:

```markdown
<script> 
    var version = $typey.getVersion();
</script>
```