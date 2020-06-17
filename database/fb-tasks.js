import * as firebase from 'firebase';
import 'firebase/database';
import { firebaseConfig } from './fb-credentials';

export function initHabitDB()
{
  firebase.initializeApp(firebaseConfig);
}

export function storeTask(task) {
  firebase.database().ref('Habit/').push(task);
}

export function updateTask(task) {
  const key = task.id;
  delete task.id;
  firebase.database().ref(`Habit/${key}`).set(task);
}

export function deleteTask(task) {
  firebase.database().ref(`Habit/${task.id}`).remove();
}

export function setupHabitListener(updateFunc) {
  firebase
    .database()
    .ref('Habit/')
    .on('value', (snapshot) => {
      console.log('setupHabitListener fires up with: ', snapshot);
      if (snapshot?.val()) {
        const fbObject = snapshot.val();
        const newArr = [];
        Object.keys(fbObject).map((key, index) => {
          console.log(key, '||', index, '||', fbObject[key]);
          newArr.push({ ...fbObject[key], id: key });
        });
        updateFunc(newArr);
      } else {
        updateFunc([]);
      }
    });
} 