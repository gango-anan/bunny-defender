export default class RemoteStorage {
  constructor() {
    this.ACCESSOR = 'GMAINCGROOVERSE20216';
  }

  async fetchScores () {
    try {
      const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.ACCESSOR}/scores/`,{
          method: 'GET',
          mode: 'cors',
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          headers: { Accept: 'application/json','Content-Type': 'application/json', },
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return error
    }
  }

  async sendScores (user, score) {
    try {
      const newResult = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.ACCESSOR}/scores/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json', 'Content-Type': 'application/json', },
            body: JSON.stringify({user, score: Number(score), }),
        },
      );
      return newResult.json();

    } catch (error) {
      return error.json();
    }
  }
}