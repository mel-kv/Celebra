<script>
export default {
  props: {
    types: Set,
    entertainers: Set,
  },
  emits: ['filterType', 'filterArtist'],
  data() {
    return {
      selectedType: '',
      selectedArtist: '',
      typeSel: false,
      artSel: false,

    };
  },
  methods: {
    typeChanged() {
      this.typeSel = true;
      this.$emit('filterType', this.selectedType);
    },
    artistChanged() {
      if (this.selectedArtist !== '')
        this.artSel = true;
      else
        this.artSel = false;
      this.$emit('filterArtist', this.selectedArtist);
    },
    resetBtn() {
      this.selectedType = '';
      this.selectedArtist = '';
      this.typeSel = false;
      this.artSel = false;
      this.$emit('filterType', this.selectedType);
      this.$emit('filterArtist', this.selectedArtist);
    },
  },
};
</script>

<template>
  <div class="filt">
    <div class="filterDiv" :class="typeSel ? 'usedFilter' : 'noFilter'">
      <label for="type">Filter by type:</label>
      <select id="type" v-model="selectedType" @change="typeChanged">
        <option value="">
          Select
        </option>
        <option v-for="type of types" :key="type" :value="type">
          {{ type }}
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
      <button type="reset" @click="resetBtn">
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
