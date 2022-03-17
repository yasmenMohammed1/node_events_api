const path = require("path");
const fs = require("fs");
imageResize.exports = (request, response, next) => {
	let imageUrl = request.body[0];
	let imageName = request.body[1];
	let imageWidth = request.body[2];
	let imageHeight = request.body[3];
	let newImage = ctx.drawImage(imageUrl, 0, 0, imageWidth, imageHeight);
	fs.unlinkSync(path.join(__dirname, "/images") + imageName);

	response.send(newImage);
};
imagesizing(data.imageName,data.width,data.height)

imagesizing = (name, width, height) => {
	//   rersizing functionality
};
