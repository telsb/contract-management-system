
# Aboitiz InfraCapital Contract Management System - Setup Guide

Follow these steps carefully to set up and run the application.

### **Part 1: Google Sheets & Google Drive Setup**

*(This part should already be complete)*

1.  **Create the Google Sheet:**
    *   Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
    *   Rename it to "Contract Management DB".
    *   Get the Sheet ID from the URL (`https://docs.google.com/spreadsheets/d/SHEET_ID_IS_HERE/edit`).

2.  **Create the Required Sheets (Tabs):**
    *   Create four tabs: `users`, `admins`, `locators`, `contracts`.

3.  **Set Up Columns in `users` sheet:**
    *   Headers: `SSID`, `Email`, `Password`, `LIMA`, `BIZHUB`, `TARI`, `MEZ2`, `WEST_CEBU`

4.  **Set Up Columns in `admins` sheet:**
    *   Headers: `Email`, `Password`.
    *   **Manually add your admin email and password here so you can log in.**

5.  **Set Up Columns in `locators` sheet:**
    *   Headers: `LocatorID`, `Estate`, `LocatorName`, `Address`, `LotArea`, `IndustryType`

6.  **Set Up Columns in `contracts` sheet:**
    *   Headers: `ContractID`, `LocatorID`, `ContractType`, `FileName`, `FileID`, `FileURL`

7.  **Create a Google Drive Folder:**
    *   Create a folder named "ContractsPDFs".
    *   Get the Folder ID from the sharing link (`https://drive.google.com/drive/folders/FOLDER_ID_IS_HERE?usp=sharing`).

### **Part 2: Google Apps Script Deployment**

*(This part should already be complete)*

1.  **Open Apps Script Editor** in your Google Sheet (`Extensions` > `Apps Script`).
2.  **Paste the `Code.gs` content** into the editor.
3.  **Update your `SHEET_ID` and `DRIVE_FOLDER_ID`** at the top of the script.
4.  **Deploy as a Web App:**
    *   Click `Deploy` > `New deployment`.
    *   Type: `Web app`.
    *   Execute as: `Me`.
    *   Who has access: `Anyone`.
5.  **Authorize Permissions** when prompted.
6.  **Copy the Web app URL**. This is your API endpoint.

---

### **Part 3: Deploying the Website with GitHub Pages**

This is the final step. You will upload the application files to GitHub to make it a live website.

1.  **Update the API Configuration:**
    *   Open the `constants.js` file in a text editor.
    *   Find the line: `export const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';`
    *   Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` with the **Web app URL** you copied in Part 2.
    *   Save the file.

2.  **Create a GitHub Repository:**
    *   Go to [github.com](https://github.com) and log in or create an account.
    *   Click the `+` icon in the top right and select `New repository`.
    *   Give it a name (e.g., `contract-management-system`).
    *   Make sure it is set to **Public**.
    *   Click `Create repository`.

3.  **Upload All Project Files:**
    *   On your new repository page, click the `Add file` button and select `Upload files`.
    *   Drag and drop **ALL** the files from this project into the upload area. This includes `index.html`, `MANUAL.md`, and the entire `components`, `services` folders etc.
    *   Wait for all files to upload, then click `Commit changes`.

4.  **Enable GitHub Pages:**
    *   In your repository, go to the `Settings` tab.
    *   In the side menu, click on `Pages`.
    *   Under "Build and deployment", for the "Source", select `Deploy from a branch`.
    *   Under "Branch", select `main` (or `master`) and `/ (root)` for the folder.
    *   Click `Save`.

5.  **Access Your Live Website:**
    *   Wait a few minutes. GitHub is now building and deploying your site.
    *   The page will refresh, and a green box will appear at the top with your live site's URL (e.g., `https://your-username.github.io/your-repo-name/`).
    *   Click the link to visit your fully functional Contract Management System!
