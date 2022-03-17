imageUrl.exports = (request, response, next) => {
	let image = request.params.imageName;
	let width = request.params.width;
	let height = request.params.height;
	next([`/images/${image}`, image, width, height]);
};
