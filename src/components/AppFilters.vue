<script>
export default {
  props: {
    countries: Set,
    entertainers: Set,
  },
  emits: ['filterCountry', 'filterArtist'],
  data() {
    return {
      selectedCountry: '',
      selectedArtist: '',
      countrySel: false,
      artSel: false,

    };
  },
  methods: {
    countryChanged() {
      this.countrySel = true;
      this.$emit('filterCountry', this.selectedCountry);
    },
    artistChanged() {
      this.artSel = true;
      this.$emit('filterArtist', this.selectedArtist);
    },
    resetBtn() {
      this.selectedCountry = '';
      this.selectedArtist = '';
      this.countrySel = false;
      this.artSel = false;
      this.$emit('filterCountry', this.selectedCountry);
      this.$emit('filterArtist', this.selectedArtist);
    },
  },
};
</script>

<template>
  <div class="filt">
    <div class="filterDiv" :class="countrySel ? 'usedFilter' : 'noFilter'">
      <label for="country">Filter by country:</label>
      <select id="country" v-model="selectedCountry" @change="countryChanged">
        <option value="">
          Select
        </option>
        <option v-for="country of countries" :key="country" :value="country">
          {{ country }}
        </option>
      </select>
    </div>
    <div class="filterDiv" :class="artSel ? 'usedFilter' : 'noFilter'">
      <label for="entertainer">Filter by artist:</label>
      <select id="entertainer" v-model="selectedArtist" @change="artistChanged">
        <option value="">
          Select
        </option>
        <option v-for="entertainer of entertainers" :key="entertainer" :value="entertainer">
          {{ entertainer }}
        </option>
      </select>
    </div>
    <div class="filterDiv">
      <label for="">&nbsp;</label>
      <button country="reset" @click="resetBtn">
        Reset Filters
      </button>
    </div>
  </div>
</template>

<style scoped>
.filt{
  font-size: 0.6rem;
  display:flex;

}

.filterDiv {
  width: 200px;
  margin-right: 10px;

}
select {
  margin-bottom: 5px;
  padding: 5px;

}

.usedFilter {
  border: 3px;
  font-weight: bold;

}
.usedFilter select{
 border-color: var(--primary);
 border-width: 3px;

}
.noFilter {
  color: var(--primary);
}
button {
  width: 200px;
  margin-right: 10px;
  padding: 5px;

}
</style>
