/*

For this quiz, can you use this script, which is in the <head> of index.html,
to change the boring placeholder image to a picture of a cute puppy?

Remember, you'll need to pass a function into the jQuery object to run 
when the document is ready.

Here's a URL for a picture of a puppy: http://placepuppy.it/350/150

										http://flickholdr.com/350/150" />

Good luck!

*/



$(function replaceWithBetterPic() {

	//console.log($('p'));

	var oldPlaceHolder, newPlaceHolder;

	oldPlaceHolder = 'http://placehold.it/350x150';
	newPlaceHolder = 'http://placepuppy.it/350/150';

	$('img').each( function() {
		if ($( this ).attr('src') === oldPlaceHolder) {
			$( this ).attr('src', newPlaceHolder);
		}
	});
});
