# Project Title: Marketplace E-commerce
# Description: A simple e-commerce marketplace built with HTML and Bootstrap.
This project is a simple e-commerce marketplace built with HTML and Bootstrap. It includes a homepage, product listing page, product details page, and a shopping cart page. The project is designed to be responsive and user-friendly, making it easy for users to navigate and find products.
# Project Specification:
The purpose of this project is to create a simple e-commerce marketplace built in linux environment, staged and pushed to Github using the gitbash command line interface. This in turn will be hosted on AWS EC2 instance.

## Implementation Steps:
1. Create a new directory called `MarketPeak E-commerce` using the `mkdir` command.
```bash
mkdir MarketPeak_e-commerce
```
![](./img/01.png)

2. Copy the content of the downloaded template into the `MarketPeak E-commerce` directory. You can use the `cp` with `-r` command to copy files and directories.
```bash
cp -r 2130_waso_strategy MarketPeak_e-commerce/ 
```
![](./img/02.png)

3. Navigate to the `MarketPeak E-commerce` directory using the `cd` command.
```bash
cd MarketPeak_e-commerce
```
![](./img/03.png)

4. Initialize a new Git repository using the `git init` command.
```bash
git init
```
![](./img/05.png)

5. List the contents of the directory using the `ls` with the `-lh` command to verify that the files have been copied successfully.
```bash
ls -lh
```
![](./img/04.png)

What the above command does is to list the files in the current directory in a human-readable format, showing file sizes in a more understandable way (e.g., KB, MB). The `-l` option provides a detailed listing, while the `-h` option makes the file sizes easier to read.


6. Edited the `index.html` file using the vscode editor. You can use the `code` command to open the file in Visual Studio Code.
```bash
code index.html
```
![](./img/06.png)

In the `index.html` file, I made some changes to the content and layout of the page. I added a header, a navigation bar, and a footer. I also included some sample products with images and descriptions. The changes were made using HTML and Bootstrap classes to ensure a responsive design.

7. Add all the files to the staging area using the `git add` command.
```bash
git add .
```


