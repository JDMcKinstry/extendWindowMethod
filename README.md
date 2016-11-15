# extendWindowMethod

<pre>
Extend any Function belonging to "window".
Use 3rd param BOOL to prepend(true) || append(default) to the method.
Also, you can remove an added method by submitting "remove" as the 3rd param.
Will return original method, or false(something went wrong).
Automatically prevents adding the same method twice with one exception:
	you can add the same method to begining (prepend) and end(default) of original method.
</pre>

### Use as simple as:
	extendWindowMethod('alert', function() { console.debug('Added First, Play last'); }, true);
	extendWindowMethod('alert', function() { console.debug('Added Mid, Play Mid'); }, true);
	extendWindowMethod('alert', function() { console.debug('Added Last, Play First'); }, true);
	alert('test');	//	check your console!

#### Remove an added method:
	extendWindowMethod('alert', function() { console.debug('Added First, Play last'); }, 'remove');
