# Color Cluster

<p align="center">
 <img width=100px  src="./src/assets/logo.png" alt="Project logo"></a>
</p>

<p align="center"> 
A tool for extracting color palette and color reduction.
</p>

language : [فارسی](/README.fa.md) / [en](/README.md)

</br>

## 📝 Table of Contents

- [Color Cluster](#color-cluster)
  - [📝 Table of Contents](#%f0%9f%93%9d-table-of-contents)
  - [💡 About](#%f0%9f%92%a1-about)
  - [🏁 How to use](#%f0%9f%8f%81-how-to-use)
  - [🔑 Main features](#%f0%9f%94%91-main-features)
  - [🧱 Build](#%f0%9f%a7%b1-build)
  - [🎯 TODO](#%f0%9f%8e%af-todo)

</br>

## 💡 About
Color cluster is a simple tool that can generate a color palette by extracting the main colors from an image.  
After generating a palette from the image, it begins to reconstruct the image with the collected color scheme and reduces the image’s colors to its main colors

</br>

## 🏁 How to use
- open [project page](https://alijany.github.io/Color-Cluster/) on github
- Drag an image to the upload box or upload an image from your system by clicking on the upload box.
- For determining the palette’s span, you can use the slider to set a value between 5 to 25.
- Click the “convert image to palette” button and the algorithm will begin to work.
- In the end on you can copy the color of each cluster by clicking on its label.

## 🔑 Main features
- The image’s colors will be displayed in 3d graph after being loaded into a canvas.
- By using the “k means clustering algorithm,” this program determines the color span of the pixels. Each running stage of the algorithm can be seen in the 3d graph.
- This program allows you to compare the output image to the original image.

</br>

## 🧱 Build
- Make sure node js is installed on your computer. (It can be download from [here](https://nodejs.org/en/).)
- Open the project in cmd and use the command “npm i .” to install the project’s dependencies.
- by using the command “npm run pro” the project will begin to get constructed in “public” folder.

</br>

## 🎯 TODO
- [ ] Option to disable the graph while running the algorithm
- [ ] Responsiveness
- [ ] Compatible with mobile phones
- [ ] Color chart
- [ ] Loading images from url

