# Fonts and Colors

## Titles
- **Font:** Modak, 60px
- **Text Color:** White
- **Background Color:** #2CBADA (Cyan)

## Subtitles
- **Font:** Modak, 25px
- **Text Color:** White

## General Text
- **Font:** Modak, 25px
- **Text Color:** White

## Buttons
- **Font:** Modak, 25px
- **Text Color:** White
- **Background Color:** #FF7F50 (Coral)

## Notifications
- **Font:** Modak, 40px
- **Text Color:** White
- **Background Color:** #22B14C (Green)

# Document Layout

- **Page Layout:** 
  - Navigation bar above a hero container
  - Hero container
  - Queue info

- **Documented Components:**
  - Navigation bar
  - Admin login button
  - Check wait time button
  - Enter queue button
  - Hero container
  - Queue info containers

# Document Components

## Main Screen

- **Header:**
  - Displays "City Hospital" and a red cross symbol
  - Includes buttons for "Check Wait Time" and "Admin Login"

- **Central Panel:**
  - Displays the "ER Waitlist" title and a short description
  - Button labeled "Enter Queue"

- **Status Panels:**
  - Display patient statistics:
    - Total Patients
    - Patients in Treatment
    - Patients Waiting
  - Display estimated wait time

## Enter Queue

- **Form Fields:**
  - Name (Text Input)
  - Injury Description (Text Input)
  - Severity of Pain (Slider from 1 to 10)

- **Submission:**
  - Button labeled "Submit"
  - On successful submission, a green notification panel displays the patient's code and estimated wait time

## Check Wait Time

- **Form Fields:**
  - Name (Text Input)
  - 3-Digit Code (Text Input)

- **Submission:**
  - Button labeled "Check"
  - On successful submission, a green notification panel displays the patient's name and estimated wait time

## Admin Login

- **Form Fields:**
  - Username (Text Input)
  - Password (Password Input)

- **Submission:**
  - Button labeled "Login"

## Admin Dashboard

- **Header:**
  - Displays "City Hospital" and a logout button

- **Central Panel:**
  - Displays "Welcome to the Admin Dashboard" title and a short description
  - Displays a table of patients:
    - Patient ID
    - Patient Name
    - Injury Description
    - Severity Level
    - Wait Time
    - Action Buttons: Admit, Remove

## Notifications

- **Queue Notification:**
  - Displays patient's code and estimated wait time

- **Wait Time Check Notification:**
  - Displays patient's name and estimated wait time
