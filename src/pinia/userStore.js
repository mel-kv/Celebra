import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = ref(false);
  const profile = ref(null);
  const favouritesIds = ref([]);

  const setProfile = (profileData) => {
    profile.value = profileData;
    isAuthenticated.value = true;
    sessionStorage.setItem('user-profile', JSON.stringify(profileData));
  };

  const addFavEvent = (id) => {
    favouritesIds.value.push(id);
  };

  const removeFavouriteProduct = (id) => {
    favouritesIds.value = favouritesIds.value.filter(favourite => favourite !== id);
  };

  const getPersistedProfile = () => {
    const persisted = sessionStorage.getItem('user-profile');
    if (!persisted)
      return;
    profile.value = JSON.parse(persisted);
    isAuthenticated.value = true;
  };

  const logout = () => {
    isAuthenticated.value = false;
    profile.value = null;
    sessionStorage.removeItem('user-profile');
  };

  return {
    isAuthenticated,
    profile,
    favouritesIds,
    setProfile,
    addFavEvent,
    removeFavouriteProduct,
    getPersistedProfile,
    logout,
  };
});

// with OPTIONS API
// import { defineStore } from 'pinia';

// export const useUserStore = defineStore('user', {
//   state: () => {
//     return {
//       isAuthenticated: false,
//       profile: null,
//       favouritesIds: [],
//     };
//   },
//   actions: {
//     setProfile(profileData) {
//       this.profile = profileData;
//       this.isAuthenticated = true;
//       sessionStorage.setItem('user-profile', JSON.stringify(profileData));
//     },
//     addFavEvent(id) {
//       this.favouritesIds.push(id);
//     },
//     removeFavouriteProduct(id) {
//       this.favouritesIds = this.favouritesIds.filter(favourite => favourite !== id);
//     },
//     getPersistedProfile() {
//       const persisted = sessionStorage.getItem('user-profile');
//       if (!persisted)
//         return;
//       this.profile = JSON.parse(persisted);
//       this.isAuthenticated = true;
//     },
//     logout() {
//       this.isAuthenticated = false;
//       this.profile = null;
//       sessionStorage.removeItem('user-profile');
//     },
//   },
// });
