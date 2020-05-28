# PICKYeats

PICKYeats is a mobile app allowing people to connect with friends and cycle through a batch of restaurants in their area to decide on a place to eat or order from. Inspired by Tinder, this app aims to provide a quick and delightful user experience so that users don't have to spend much time using it. 

Backend respository: https://github.com/kadrianne/pickyeats-backend


## Built With
Frontend: JavaScript, React Native v0.62.2, Redux, [React Native Elements](https://react-native-elements.github.io/)<br>
Backend: Python 3.8.2, Django v3.0.6, Django Rest Framework v3.11.0, PostgreSQL v12.2

API for business data: [Yelp Fusion](https://www.yelp.com/fusion)

The app is currently only build for and tested with an Android device (Pixel 3 XL) using an Android Studio emulator.

## App Features

### Start a Party

On login/signup, users are directed to the 'Start a Party' by:
1. Inputting a title
2. Adding other users via a filter that displays data based on a match input of name, phone number, or email
3. Inputting a location

When these steps are completed, the party is marked as active, and others users will be able to view their party on login.

![start-a-party](https://res.cloudinary.com/kristine-and-samuel/image/upload/v1590701050/PICKYeats/party.gif)

### Like/Dislike and View Restaurant Details

When a user is in an active party, they are directed to a restaurant card based on the location paramaters. A restaurant card displays an image and some information on load with like and dislike buttons for the user to make a decision. There is also an option to View More with additional images and information like reviews. 

![restaurants](https://res.cloudinary.com/kristine-and-samuel/image/upload/v1590701185/PICKYeats/restaurants.gif)

### Matching a Place & My Party screen

When a user likes a place that another user in the party has previously liked, a match notification will display for the user. The user can then view their party matches on the 'My Party' screen. An badge indicator will also display on the party icon in the upper-left with the number of matched places.

![party-matches](https://res.cloudinary.com/kristine-and-samuel/image/upload/v1590701291/PICKYeats/match.gif)

## Challenges

Implementing Redux for the first time, there was a learning curve associated with understanding when and how to use reducers and the dispatch method. I found that using hooks with Redux really simplified this process. With this app needing to hold a lot of different pieces of data, Redux ended up being very useful and easier to debug with React Native Debugger in order to see state in one place.

On that note, the data modeling and logic to retrieve data for users added to a party and match restaurants for users in the party made the app pretty complex. The more features I added, the more I realized that I needed to create more APIs and routes for the data I needed to store and retrieve. With needed to check for a matched restaurant on every interaction, it was also difficult matching up the frontend state to data being saved. I needed to refactor a few times in order to get this to work properly.

## Future Implementation

- Build and test for iOS
- Add swipe animations
- Add profile page and features
- Implement additional match logic for parties with 2+ users

## Collaboration

1. Fork and/or clone this repo & the backend repo - https://github.com/kadrianne/pickyeats-backend
2. Create PostgreSQL database `createdb pickyeats`
3. Migrate database tables in backend: `python3 manage.py migrate`
4. Run backend server: `python3 manage.py runserver`
5. Install dependencies on frontend: `npm install`
6. Run frontend server: `npx react-native run-android`
7. Checkout new branch
   
I have a GitHub project board with a few backlog items here: https://github.com/kadrianne/pickyeats/projects/1<br>
If you'd like to collaborate on this project, please email me: kristine.a.du@gmail.com
