# Typey.js - Binding Options:

Below are all the JSON properties that can be passed in the "data-typey-options" binding attribute for a DOM element.


### Standard Options:
<br/>

| Type: | Name: | Description: |
| --- | --- | --- |
| *number* | speed | States that speed that the text should be typed in milliseconds (defaults to 100). |
| *string* | typingCharacter | States the typing character(s) that should be shown (defaults to "_"). |
| *boolean* | delete | States if the text should shown a delete typing effect (defaults to false). |
| *boolean* | repeat | States if the typing effect should always repeat (defaults to false). |

<br/>


## Binding Example:

```markdown
<div data-typey-options="{ 'speed': 100 }">
    <p>This is some example text that should be typed out.</p>
</div>
```