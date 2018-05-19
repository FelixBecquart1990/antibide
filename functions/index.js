const functions = require('firebase-functions'),
  admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// Clean up datas
exports.resetExperienceInUsers = functions.https.onRequest((req, res) => {
    admin.database().ref().child('users').once('value')
      .then(snap => {
        snap.forEach(childSnap => {
          //console.log(childSnap.child("error").exists())
  
          let payload = {
            'experience':0
          }
          let cleanedUser = Object.assign({}, childSnap.val(), payload)
          admin.database().ref('users/' + childSnap.child("uid").val()).update(cleanedUser)
          
        })
        return
      })
  })

  exports.resetExperienceInTeams = functions.https.onRequest((req, res) => {
    admin.database().ref().child('teams').once('value')
      .then(snap => {
        snap.forEach(childSnap => {
            childSnap.forEach(childChildSnap => {
  
                let payload = {
                    'experience':0
                }
                let cleanedUser = Object.assign({}, childChildSnap.val(), payload)

                admin.database().ref('teams/' + childSnap.key+"/"+childChildSnap.key).update(cleanedUser)

            })
        })
        return
      })
  })