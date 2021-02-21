import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDd_mFhjZOXCRmv09ru8jB97Nk7EwEzk6A",
    authDomain: "engbook-96968.firebaseapp.com",
    databaseURL: "https://engbook-96968.firebaseio.com",
    projectId: "engbook-96968",
    storageBucket: "engbook-96968.appspot.com",
    messagingSenderId: "238613987334",
    appId: "1:238613987334:web:818432d0e89df2d65cc387",
    measurementId: "G-GQ1RSREC30"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Auth
// var provider = new firebase.auth.GoogleAuthProvider();
// var userId ="", displayName = "";
// var ref_words;

// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // already signed-in
//       initUserDataOnAuth(user);
//       console.log(user);
//     } else {
//       // show sign-in popup
//       firebase.auth().signInWithPopup(provider).then(function(result) {
//         initUserDataOnAuth(result.user);
//         console.log(result);
//       }).catch(function(error) {
//         console.log(error);
//         alert("Failed To Login");
//       });
//     }
// });

// function initUserDataOnAuth(user){
//     userId = user.uid;
//     displayName = user.displayName;
//     ref_words = database.ref('users/'+userId+'/words/');
//     readUserData();
// }

// //=================================================================

// const database = firebase.database();

// // Write to Firebase
// function writeUserData(word, meaning, sent, offset) {
//     if(userId.length == 0){
//       return; 
//     }

//     ref_words.child(word).set({
//       word: word,
//       meaning: meaning,
//       sents: [{sent:sent, offset:offset}],
//       time: firebase.firestore.Timestamp.now().seconds
//     });
//     console.log(word);
// }

// // Read From Firebase
// export function readUserData(){
//     ref_words.orderByChild('time').on('child_added', function(snapshot){
//       const child_val = snapshot.val();
//     //   with(child_val){
//         //   console.log({word, meaning, sents});
//         // appendWord(word, meaning, sents);
//     //   }
//       console.log(child_val);
//     });
// }
