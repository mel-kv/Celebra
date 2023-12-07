import axios from 'axios';

export async function getAllEvents() {
  try {
    const res = await axios.get('/public/events.json');

    return res.data;
  }
  catch (e) {
    console.error('There is no data to show', e);
    return {
      events: [],
    };
  }
}

export async function getEvent(id) {
  try {
    const resources = await getAllEvents();
    return resources.data.find((event) => {
      return event.id === id;
    });
  }
  catch (e) {
    console.error('There is a problem with getting a single event. Look in dataProviders/events.js', e);
    return null;
  }
}
