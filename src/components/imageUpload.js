export default class ImageUpload {
    constructor() {
        this.imageUpload = document.getElementById("image-upload");
        this.currentImg;
        this.images = [];

        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
        this.handleOtherIcons = this.handleOtherIcons.bind(this);

        this.imageUpload.addEventListener("change", this.handleImageUpload);
        document.getElementById('images').addEventListener("click", this.handleImageClick);
    }

    existingUploads() {
        let img1 = document.createElement('img');
        let img2 = document.createElement('img');
        let img3 = document.createElement('img');
        let img4 = document.createElement('img');
        let img5 = document.createElement('img');
        let img6 = document.createElement('img');
        img1.src="./dist/images/pawprint-yellow.png";
        img2.src="./dist/images/pawprint.png";
        img3.src="./dist/images/heart.png";
        img4.src="./dist/images/paw.png";
        img5.src="./dist/images/bird-footprint-on-circle.png";
        img6.src="./dist/images/animal-footprints.png";

        img1.classList.add("upload");
        img2.classList.add("upload");
        img3.classList.add("upload");
        img4.classList.add("upload");
        img5.classList.add("upload");
        img6.classList.add("upload");

        this.images.push(img1);
        document.getElementById('images').appendChild(img1);
        
        this.images.push(img2);
        document.getElementById('images').appendChild(img2);

        this.images.push(img3);
        document.getElementById('images').appendChild(img3);

        this.images.push(img4);
        document.getElementById('images').appendChild(img4);

        this.images.push(img5);
        document.getElementById('images').appendChild(img5);

        this.images.push(img6);
        document.getElementById('images').appendChild(img6);
    }

    handleImageClick(e) {
        let img = document.createElement('img');
        img.src = e.target.src;

        let imgs = document.querySelectorAll('.upload');
        imgs.forEach(ele => {
            ele.classList.remove('img-selected');
        });

        // this.currentImg.classList.remove("img-selected");

        img.classList.add("img-selected");

        this.currentImg = img;
        // this.currentImg.classList.add("img-selected");
        this.currentImg.setAttribute("style", "border: 1px solid black");

        document.getElementById("upload-icon").classList.add("selected"); // this is the selected action from the toolbar
        document.getElementById("upload-icon").setAttribute("style", "background-color: black; box-shadow: none;");
        document.getElementById("upload-icon").src = "../../dist/images/tree-on.png";

        // reset the regular styling of the other icons
        this.handleOtherIcons();
    }

    handleOtherIcons() {
        document.getElementById("brush-icon").setAttribute("style", "background-color: white; box-shadow: 0.1rem 0.1rem 0 rgba(0,0,0,0.25);");
        document.getElementById("brush-icon").src = "../../dist/images/pencil.png";
        document.getElementById("brush-icon").classList.remove("selected");

        document.getElementById("eraser-icon").setAttribute("style", "background-color: white; box-shadow: 0.1rem 0.1rem 0 rgba(0,0,0,0.25);");
        document.getElementById("eraser-icon").src = "../../dist/images/eraser.png";
        document.getElementById("eraser-icon").classList.remove("selected");
    }

    handleImageUpload(e) {
        let files = e.target.files;
        if (!files.length) return;
        let file = files[0];
        if (file.type !== '' && !file.type.match('image.*')) return;

        window.URL = window.URL || window.webkitURL;

        let imageSRC = window.URL.createObjectURL(file);
       
        let img = document.createElement('img');
        img.src = imageSRC;

        img.classList.add("upload");
        document.getElementById('images').appendChild(img);
        this.images.push(img);
    }
}